import util from "./common/util";
import CONSTANT from "./common/CONSTANT";

class FujifilmExif {
    constructor(image) {
        return this.getImageExif(image);
    }
    async getImageExif(image) {
        let buffer;
        if (image.src) {
            buffer = await util.srcToBuffer(image.src);
        } else if (image instanceof Blob) {
            buffer = await util.blobFileToBuffer(image.src);
        }
        return this.findExifInJPEG(buffer);
    }
    // 【 获取 JPEG 的 EXIF 信息 】
    findExifInJPEG(buffer) {
        const dataView = new DataView(buffer);

        // JPEG文件都是以十六进制 '0xFFD8’开始
        if (dataView.getUint16(0) != 0xffd8) {
            util.debugLog("Not a valid JPEG");
            return false;
        }

        const length = buffer.byteLength;

        // 找到 APP1 数据开始的位置
        const exifStartIndex = (function getExifPosition(dataView, byteLength) {
            let offset = 2; //因为前两位是0xFFD8，ArrayBuffer 使用的视图是Uint8Array所以从2（0xFFD8是两位）开始遍历
            while (offset < byteLength) {
                // Exif使用APP1（0xFFE1）标志
                if (dataView.getUint8(offset) === 0xff && dataView.getUint8(offset + 1) === 0xe1) {
                    //APP1的数据从"SSSS"后开始 所以加4
                    return offset + 4;
                }
                offset++;
            }
        })(dataView, length);

        if (exifStartIndex) {
            // 根据上一次获取的索引，然后根据索引后4位判断后续是否是Exif信息
            if (util.getStringFromDB(dataView, exifStartIndex, 4) !== "Exif") {
                util.debugLog("Not valid EXIF data!");
                return;
            }
            // 这里exifStartIndex + 6的原因是Exif数据是从ASCII字符"Exif"和2个字节的0x00开始，后面就是Exif的数据了。EXif+2个字节 正好是6
            return this.getTIFFInfo(dataView, exifStartIndex + 6);
        } else {
            return undefined;
        }
    }
    // 【 从 TIFF 数据开始 依次读取 TIFF、EXIF、MakerNote 数据 】
    getTIFFInfo(dataView, tiffStartOffset) {
        //前两个字节定义了TIFF数据采用何种字节顺序
        let bigEndian = dataView.getUint16(tiffStartOffset) === 0x4d4d;
        // 然后的两个字节总是2个字节长度的0x002A
        if (dataView.getUint16(tiffStartOffset + 2, !bigEndian) != 0x002a) {
            util.debugLog("Not valid TIFF data! (no 0x002A)");
            return false;
        }
        //TIFF头的最后4个字节是第一个IFD的偏移量。
        const firstIFDOffset = dataView.getUint32(tiffStartOffset + 4, !bigEndian);
        //通常第一个IFD是紧跟在TIFF头后面的，所以它的偏移量为’0x00000008’
        if (firstIFDOffset < 0x00000008) {
            util.debugLog(
                "Not valid TIFF data! (First offset less than 8)",
                dataView.getUint32(tiffStartOffset + 4, !bigEndian)
            );

            return false;
        }

        const output = {
            tiffData: {},
            exifData: {},
            makerNoteData: {},
            flat: {}
        };

        const tiffData = this.readTags(
            dataView,
            tiffStartOffset,
            tiffStartOffset + firstIFDOffset,
            CONSTANT.TiffTags,
            bigEndian
        );

        output.tiffData = tiffData;

        if (tiffData && tiffData.ExifIFDPointer) {
            const exifData = this.readTags(
                dataView,
                tiffStartOffset,
                tiffStartOffset + tiffData.ExifIFDPointer,
                CONSTANT.ExifTags,
                bigEndian
            );

            output.exifData = exifData;
        }

        if (output.exifData && output.exifData.MakerNote) {
            const buffer = new Uint8Array(output.exifData.MakerNote).buffer;
            const makerNoteDataView = new DataView(buffer);
            // FUJIFILM
            const maker_FUJIFILM = util.getStringFromDB(makerNoteDataView, 0, 8);
            if (maker_FUJIFILM === "FUJIFILM") {
                /* 
                Fujifilm's digicam added the MakerNote tag from the Year2000's model (e.g.Finepix1400,Finepix4700). It uses IFD format and start from ASCII character 'FUJIFILM', and next 4 bytes(value 0x000c) points the offset to first IFD entry. Example of actual data structure is shown below.
  
                There are two big differences to the other manufacturers.
                Fujifilm's Exif data uses Motorola align, but MakerNote ignores it and uses Intel align.
                The other manufacturer's MakerNote counts the "offset to data" from the first byte of TIFF header (same as the other IFD), but Fujifilm counts it from the first byte of MakerNote itself.
                I think it's a BUG, but it can't be helped now... The data below is analyzed at Fujifilm FinePix4900Z.
                */
                const fujiData = this.readTags(
                    makerNoteDataView,
                    0,
                    8 + 4,
                    CONSTANT.FujiTags,
                    bigEndian
                );

                util.debugLog("=================fujifilm:", fujiData);
                // console.table(fujiData);
                output.makerNoteData = fujiData;
            }
        }

        output.flat = {
            ...output.tiffData,
            ...output.exifData,
            ...output.makerNoteData
        };

        return output;
    }
    // 【 读取标签项 】
    readTags(dataView, tiffStartOffset, dirStartOffset, tagsMap, bigEndian) {
        const length = dataView.getUint16(dirStartOffset, !bigEndian); // 开始的两个字节（‘EEEE’）表示这个IFD所包含的item数, 一共有 length 条
        const dirItemStart = dirStartOffset + 2; // 偏移2个字节 EEEE
        const tags = {};
        let itemOffset;
        let tag;

        const list = [];
        for (let i = 0; i < length; i++) {
            //然后紧跟着就是实体对象（每个实体12个字节）
            let itemOffset = dirItemStart + i * 12;
            const key = dataView.getUint16(itemOffset, !bigEndian);
            list.push(util.parse10To16(key));

            tag = tagsMap[key];

            if (!tag) {
                util.debugLog(`Unknown tag: ${util.parse10To16(key)}`);
            } else {
                const tagValue = this.readTagValue(
                    dataView,
                    itemOffset,
                    tiffStartOffset,
                    dirStartOffset,
                    bigEndian
                );
                switch (typeof tag) {
                    case "string":
                        tags[tag] = tagValue;
                        break;

                    case "object":
                        const { tagName, optionsMap, parser } = tag;
                        if (optionsMap) {
                            // 解析选项
                            tags[tagName] = optionsMap[tagValue];
                        } else {
                            // 字符串或数字
                            if (parser) {
                                tags[tagName] = parser(tagValue);
                            } else {
                                tags[tagName] = tagValue;
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
        }
        return tags;
    }
    // 【 获取标签对应的值 】
    readTagValue(dataView, itemOffset, tiffStartOffset, dirStartOffset, bigEndian) {
        const type = dataView.getUint16(itemOffset + 2, !bigEndian); // 获取数据类型，见https://alanngai1996.xyz/screenshot/exif%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B.png “rational”是一个小数，它包含2个有符号/无符号长整数值，第一个代表分子，第二个代表分母。
        const numValues = dataView.getUint32(itemOffset + 4, !bigEndian); // 组件数
        const valueOffset = dataView.getUint32(itemOffset + 8, !bigEndian) + tiffStartOffset; // 数据值的偏移量

        let offset;
        let vals;
        let val;
        let n;
        let numerator;
        let denominator;
        switch (type) {
            case 1: // byte, 8-bit unsigned int
            case 7: // undefined, 8-bit byte, value depending on field
                if (numValues == 1) {
                    return dataView.getUint8(itemOffset + 8, !bigEndian);
                } else {
                    offset = numValues > 4 ? valueOffset : itemOffset + 8;
                    vals = [];
                    for (n = 0; n < numValues; n++) {
                        vals[n] = dataView.getUint8(offset + n);
                    }
                    return vals;
                }

            case 2: // ascii, 8-bit byte
                offset = numValues > 4 ? valueOffset : itemOffset + 8;
                return util.getStringFromDB(dataView, offset, numValues - 1);

            case 3: // short, 16 bit int
                if (numValues == 1) {
                    return dataView.getUint16(itemOffset + 8, !bigEndian);
                } else {
                    offset = numValues > 2 ? valueOffset : itemOffset + 8;
                    vals = [];
                    for (n = 0; n < numValues; n++) {
                        vals[n] = dataView.getUint16(offset + 2 * n, !bigEndian);
                    }
                    return vals;
                }

            case 4: // long, 32 bit int
                if (numValues == 1) {
                    return dataView.getUint32(itemOffset + 8, !bigEndian);
                } else {
                    vals = [];
                    for (n = 0; n < numValues; n++) {
                        vals[n] = dataView.getUint32(valueOffset + 4 * n, !bigEndian);
                    }
                    return vals;
                }

            case 5: // rational = two long values, first is numerator, second is denominator
                if (numValues == 1) {
                    numerator = dataView.getUint32(valueOffset, !bigEndian);
                    denominator = dataView.getUint32(valueOffset + 4, !bigEndian);
                    val = new Number(numerator / denominator);
                    val.numerator = numerator;
                    val.denominator = denominator;
                    return val;
                } else {
                    vals = [];
                    for (n = 0; n < numValues; n++) {
                        numerator = dataView.getUint32(valueOffset + 8 * n, !bigEndian);
                        denominator = dataView.getUint32(valueOffset + 4 + 8 * n, !bigEndian);
                        vals[n] = new Number(numerator / denominator);
                        vals[n].numerator = numerator;
                        vals[n].denominator = denominator;
                    }
                    return vals;
                }

            case 9: // slong, 32 bit signed int
                if (numValues == 1) {
                    return dataView.getInt32(itemOffset + 8, !bigEndian);
                } else {
                    vals = [];
                    for (n = 0; n < numValues; n++) {
                        vals[n] = dataView.getInt32(valueOffset + 4 * n, !bigEndian);
                    }
                    return vals;
                }

            case 10: // signed rational, two slongs, first is numerator, second is denominator
                if (numValues == 1) {
                    return (
                        dataView.getInt32(valueOffset, !bigEndian) /
                        dataView.getInt32(valueOffset + 4, !bigEndian)
                    );
                } else {
                    vals = [];
                    for (n = 0; n < numValues; n++) {
                        vals[n] =
                            dataView.getInt32(valueOffset + 8 * n, !bigEndian) /
                            dataView.getInt32(valueOffset + 4 + 8 * n, !bigEndian);
                    }
                    return vals;
                }
        }
    }
}

export default FujifilmExif;
