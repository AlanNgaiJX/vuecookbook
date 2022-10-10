class BasicExif {
    constructor(image) {
        return this.getImageExif(image);
    }
    getImageExif(image) {
        if (image.src) {
            return this.domImageExif(image.src);
        } else if (image instanceof Blob) {
            return this.blobImageExif(image);
        }
    }
    async blobImageExif(file) {
        var _t = this;
        return new Promise(res => {
            var fileReader = new FileReader();
            fileReader.onload = function(e) {
                res(_t.findExifInJPEG(e.target.result));
            };
            fileReader.readAsArrayBuffer(file);
        });
    }
    async domImageExif(src) {
        let result;
        if (/^data\:/i.test(src)) {
            // Data URI
            result = this.base64Url(src);
        } else {
            result = await this.blobUrl(src);
        }
        return Promise.resolve(result);
    }
    // 【 base64转为二进制文件 】
    base64Url(base64) {
        // 参考 base64转译步骤 https://alanngai1996.xyz/screenshot/base64%E8%BD%AC%E8%AF%91%E6%AD%A5%E9%AA%A4.png
        base64 = base64.replace(/^data\:([^\;]+)\;base64,/gim, "");
        const binary = atob(base64);
        const len = binary.length;
        const buffer = new ArrayBuffer(len); // 根据长度创建二进制缓冲区
        const view = new Uint8Array(buffer); // 创建视图操作
        for (let i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i); //获取字符串的Unicode
        }
        return this.findExifInJPEG(buffer);
    }
    async blobUrl(src) {
        const buffer = await this.httpToBlob(src);
        return this.findExifInJPEG(buffer);
    }
    httpToBlob(url) {
        return new Promise(res => {
            var http = new XMLHttpRequest();
            http.open("GET", url, true);
            http.responseType = "arraybuffer";
            http.onload = function(e) {
                if (this.status == 200 || this.status === 0) {
                    res(this.response);
                }
            };
            http.send();
        });
    }
    findExifInJPEG(buffer) {
        var dataView = new DataView(buffer);
        // JPEG文件都是以十六进制 '0xFFD8’开始
        if (dataView.getUint16(0) != 0xffd8) {
            console.log("Not a valid JPEG");
            return false; // not a valid jpeg
        }

        let length = buffer.byteLength;
        let exifStartIndex = this.getExifPosition(dataView, length);
        if (exifStartIndex) {
            // 根据上一次获取的索引，然后根据索引后4位判断后续是否是Exif信息
            if (this.getStringFromDB(dataView, exifStartIndex, 4) !== "Exif") {
                console.log("Not valid EXIF data!");
                return;
            }
            // 这里exifStartIndex + 6的原因是Exif数据是从ASCII字符"Exif"和2个字节的0x00开始，后面就是Exif的数据了。EXif+2个字节 正好是6
            return this.getTIFFInfo(dataView, exifStartIndex + 6);
        } else {
            return undefined;
        }
    }
    getExifPosition(dataView, byteLength) {
        let offset = 2; //因为前两位是0xFFD8，ArrayBuffer 使用的视图是Uint8Array所以从2（0xFFD8是两位）开始遍历
        while (offset < byteLength) {
            // Exif使用APP1（0xFFE1）标志
            if (dataView.getUint8(offset) === 0xff && dataView.getUint8(offset + 1) === 0xe1) {
                //APP1的数据从"SSSS"后开始 所以加4
                return offset + 4;
            }
            offset++;
        }
    }
    getStringFromDB(dataView, start, length) {
        let max = start + length;
        let result = "";
        for (let i = start; i < max; i++) {
            result += String.fromCharCode(dataView.getUint8(i));
        }
        return result;
    }
    getTIFFInfo(dataView, tiffOffset) {
        //前两个字节定义了TIFF数据采用何种字节顺序
        let bigEndian = dataView.getUint16(tiffOffset) === 0x4d4d;
        // 然后的两个字节总是2个字节长度的0x002A
        if (dataView.getUint16(tiffOffset + 2, !bigEndian) != 0x002a) {
            console.log("Not valid TIFF data! (no 0x002A)");
            return false;
        }
        //TIFF头的最后4个字节是第一个IFD的偏移量。
        const firstIFDOffset = dataView.getUint32(tiffOffset + 4, !bigEndian);
        //通常第一个IFD是紧跟在TIFF头后面的，所以它的偏移量为’0x00000008’
        if (firstIFDOffset < 0x00000008) {
            console.log(
                "Not valid TIFF data! (First offset less than 8)",
                dataView.getUint32(tiffOffset + 4, !bigEndian)
            );
            return false;
        }
        // 0x0112 代表Orientation
        return this.getTag(dataView, tiffOffset + firstIFDOffset, bigEndian, 0x0112);
    }
    getTag(dataView, dirStart, bigEndian, tag) {
        const length = dataView.getUint16(dirStart, !bigEndian); // 开始的两个字节（‘EEEE’）表示这个IFD所包含的item数, 一共有 length 条
        const dirItemStart = dirStart + 2; // 偏移2个字节 EEEE
        for (let i = 0; i < length; i++) {
            //然后紧跟着就是实体对象（每个实体12个字节）
            let itemOffset = dirItemStart + i * 12;

            // 尝试获取数据类型
            const dataType = dataView.getUint16(itemOffset + 2, !bigEndian);
            if (dataView.getUint16(itemOffset, !bigEndian) === tag) {
                console.log("数据类型是：", dataType);

                // 此处只获取Orientation的值，需要偏移8位
                itemOffset += 8;
                return dataView.getUint16(itemOffset, !bigEndian);
            }
        }
    }
}

export default BasicExif;
