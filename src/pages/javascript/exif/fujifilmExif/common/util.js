const util = {
    debug: false,
    // 【 http链接 转 buffer 】
    httpToBuffer(imageUrl) {
        return new Promise((resolve, reject) => {
            const http = new XMLHttpRequest();
            http.open("GET", imageUrl, true);
            http.responseType = "arraybuffer";
            http.onload = function(e) {
                if (this.status == 200 || this.status === 0) {
                    resolve(this.response);
                } else {
                    reject(`请求图片失败, ${this.status}:` + `"${imageUrl}"`);
                }
            };
            http.send();
        });
    },
    // 【 base64 转 buffer 】
    base64ToBuffer(base64) {
        // 参考 base64转译步骤 https://alanngai1996.xyz/screenshot/base64%E8%BD%AC%E8%AF%91%E6%AD%A5%E9%AA%A4.png
        base64 = base64.replace(/^data\:([^\;]+)\;base64,/gim, "");
        const binary = atob(base64);
        const len = binary.length;
        const buffer = new ArrayBuffer(len); // 根据长度创建二进制缓冲区
        const view = new Uint8Array(buffer); // 创建视图操作
        for (let i = 0; i < len; i++) {
            view[i] = binary.charCodeAt(i); //获取字符串的Unicode
        }
        return buffer;
    },
    // 【 base64或网络链接转buffer 】
    async srcToBuffer(src) {
        let buffer;
        if (/^data\:/i.test(src)) {
            buffer = util.base64ToBuffer(src);
        } else {
            try {
                buffer = await util.httpToBuffer(src);
            } catch (msg) {
                console.warn(msg);
            }
        }

        return Promise.resolve(buffer || null);
    },
    // 【 blob file 转 buffer 】
    async blobFileToBuffer(file) {
        return new Promise(res => {
            var fileReader = new FileReader();
            fileReader.onload = function(e) {
                res(e.target.result);
            };
            fileReader.readAsArrayBuffer(file);
        });
    },
    // 【 从二进制数据读取字符串 】
    getStringFromDB(dataView, start, length) {
        let max = start + length;
        let result = "";
        for (let i = start; i < max; i++) {
            result += String.fromCharCode(dataView.getUint8(i));
        }
        return result;
    },
    // 【 十进制转十六进制字符串 】
    parse10To16(val10, fix4 = true) {
        const hex = val10.toString(16);
        let fix = "";
        for (let i = 0; i < 4 - hex.length; i++) {
            fix += "0";
        }
        return fix4 ? "0x" + fix + val10.toString(16) : "0x" + val10.toString(16);
    },
    // 【 调试打印 】
    debugLog(...args) {
        util.debug && console.warn(...args);
    }
};

export default util;
