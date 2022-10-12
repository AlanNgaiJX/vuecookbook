<template>
    <div class="image_trans">
        <h1>所有转换路径</h1>
        <div class="test-case">
            <div class="option-group">
                <button @click="chooseFile">input type='file' => Blob / File</button>
                <button @click="httpLinkToImage">http link => image Element</button>
                <button @click="httpLinkToArrayBuffer">http link => Arraybuffer</button>
                <button @click="httpLinkToBlob">http link => Blob / File</button>
            </div>

            <div class="option-group">
                <button @click="imageElementToCanvas">image Element => canvas</button>
                <button @click="canvasToBase64">canvas => base64 / dataURL</button>
                <button @click="canvasToBlob">canvas => Blob / File</button>
                <button @click="canvasToImageData">canvas => imageData</button>
                <button @click="imageDataToCanvas">imageData => canvas</button>
            </div>

            <div class="option-group">
                <button @click="base64ToImageElement">base64 / dataURL => imageElement</button>
                <button @click="base64ToArrayBuffer">base64 / dataURL => ArrayBuffer</button>
            </div>

            <div class="option-group">
                <button @click="arrayBufferToBase64">ArrayBuffer => base64 / dataURL</button>
                <button @click="arrayBufferToBlob">ArrayBuffer => Blob / File</button>
            </div>

            <div class="option-group">
                <button @click="blobToBase64">Blob / File => base64 / dataURL</button>
                <button @click="blobToURL">Blob / File => blobURL / ObjectURL</button>
                <button @click="blobUrlToImageElement">blobURL / ObjectURL => imageElement</button>
            </div>

            <div class="option-group">
                <button @click="blobToArrayBuffer">Blob / File => ArrayBuffer</button>
                <button @click="arrayBufferToTypeArray">ArrayBuffer => TypedArray</button>
                <button @click="typedArrayToArrayBuffer">TypedArray => ArrayBuffer</button>
                <button @click="arrayBufferToDataView">ArrayBuffer => DataView</button>
                <button @click="dataViewToArrayBuffer">DataView => ArrayBuffer</button>
            </div>
        </div>

        <img
            style="width: 1000px;"
            src="https://alanngai1996.xyz/screenshot/image%E8%BD%AC%E6%8D%A2%E5%A4%A7%E5%85%A8.png?v=1"
            alt=""
        />

        <input
            v-show="false"
            type="file"
            id="imageInput"
            accept="image/jpeg"
            @change="handleFileSelect"
        />

        <h2>canvasWrap</h2>
        <div id="canvasWrap"></div>

        <h2>imageWrap</h2>
        <div id="imageWrap"></div>
    </div>
</template>

<script>
export default {
    name: "image_trans",
    data() {
        return {
            httpLink:
                "https://alanngai1996.xyz/store/fujifilm-recipes/fujifilm-recipes-sample-compressed-a/No.100/DSCF0635.jpg",
            blob: null,
            imageElement: null,
            arrayBuffer: null,
            canvas: null,
            imageData: null,
            base64: null,
            blobURL: null,
            typeArray: null,
            dataView: null
        };
    },
    methods: {
        getBase64(imgUrl) {
            window.URL = window.URL || window.webkitURL;
            var xhr = new XMLHttpRequest();
            xhr.open("get", imgUrl, true);
            // 至关重要
            xhr.responseType = "blob";
            xhr.onload = function() {
                if (this.status == 200) {
                    //得到一个blob对象
                    var blob = this.response;
                    console.log("blob", blob);
                    //  至关重要
                    let oFileReader = new FileReader();
                    oFileReader.onloadend = function(e) {
                        let base64 = e.target.result;
                        console.log("方式一》》》》》》》》》", base64);
                    };
                    oFileReader.readAsDataURL(blob);

                    console.log(window.URL.createObjectURL(blob));

                    // //====为了在页面显示图片，可以删除====
                    // var img = document.createElement("img");
                    // img.onload = function(e) {
                    //     window.URL.revokeObjectURL(img.src); // 清除释放
                    // };
                    // let src = window.URL.createObjectURL(blob);

                    // img.src = src;
                    // document.getElementById("container1").appendChild(img);
                    // //====为了在页面显示图片，可以删除====
                }
            };
            xhr.send();
        },
        refreshCanvasWrap(canvas) {
            const canvasWrap = document.getElementById("canvasWrap");
            const child = canvasWrap.children[0];
            child && canvasWrap.removeChild(child);
            canvasWrap.appendChild(canvas);
        },
        refreshImageWrap(image) {
            const imageWrap = document.getElementById("imageWrap");
            const child = imageWrap.children[0];
            child && imageWrap.removeChild(child);
            imageWrap.appendChild(image);
        },
        chooseFile() {
            const inputEl = document.getElementById("imageInput");
            const clickEvent = new MouseEvent("click");
            inputEl.dispatchEvent(clickEvent);
        },
        // 【 input type='file' => Blob / File 】
        handleFileSelect(e) {
            const file = e.target.files[0];
            console.log("input => blob", file);
            this.blob = file;
            e.target.value = null;
        },
        // 【 Blob / File => base64 / dataURL 】
        blobToBase64() {
            if (!this.blob) {
                return console.warn("暂无 blob");
            }

            const fileReader = new FileReader();
            fileReader.onload = e => {
                this.base64 = e.target.result;

                console.log("Blob / File => base64 / dataURL", this.base64);

                const image = new Image();
                image.src = this.base64;
                this.refreshImageWrap(image);
            };
            fileReader.readAsDataURL(this.blob);
        },
        // 【 http link => image Element 】
        httpLinkToImage() {
            const imgEl = new Image();

            imgEl.onload = () => {
                console.log("http link => image Element", imgEl);
                this.imageElement = imgEl;
                this.refreshImageWrap(imgEl);
            };

            // 注意 crossOrigin 一定要放在 src 前，否则在移动端会跨域失败
            imgEl.crossOrigin = "*";
            imgEl.src = this.httpLink;
        },
        // 【 http link => Arraybuffer 】
        httpLinkToArrayBuffer() {
            const http = new XMLHttpRequest();
            http.open("GET", this.httpLink, true);
            http.responseType = "arraybuffer";
            http.onload = e => {
                if (http.status == 200 || http.status === 0) {
                    console.log("http link => Arraybuffer", http.response);
                    this.arrayBuffer = http.response;
                } else {
                    console.log("请求图片失败");
                }
            };
            http.send();
        },
        // 【 http link => Blob / File 】
        httpLinkToBlob() {
            const http = new XMLHttpRequest();
            http.open("GET", this.httpLink, true);
            http.responseType = "blob";
            http.onload = e => {
                if (http.status == 200 || http.status === 0) {
                    console.log("http link => Blob / File", http.response);
                    this.blob = http.response;
                } else {
                    console.log("请求图片失败");
                }
            };
            http.send();
        },
        // 【 image Element => canvas 】
        imageElementToCanvas() {
            if (!this.imageElement) {
                return console.warn("暂无 imageElement");
            }
            const canvas = document.createElement("canvas");
            canvas.width = this.imageElement.width;
            canvas.height = this.imageElement.height;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(this.imageElement, 0, 0);

            this.refreshCanvasWrap(canvas);
            this.canvas = canvas;
            console.log("image Element => canvas", this.canvas);
        },
        // 【 canvas => imageData 】
        canvasToImageData() {
            if (!this.canvas) {
                return console.warn("暂无 canvas");
            }
            this.imageData = this.canvas
                .getContext("2d")
                .getImageData(0, 0, this.canvas.width, this.canvas.height);
            console.log("canvas => imageData", this.imageData);
        },
        // 【 imageData => canvas 】
        imageDataToCanvas() {
            if (!this.imageData) {
                return console.warn("暂无 imageData");
            }
            const canvas = document.createElement("canvas");
            canvas.width = this.imageData.width;
            canvas.height = this.imageData.height;

            const ctx = canvas.getContext("2d");
            ctx.putImageData(this.imageData, 0, 0);

            this.refreshCanvasWrap(canvas);
            this.canvas = canvas;
            console.log("imageData => canvas", this.canvas);
        },
        // 【 canvas => base64 / dataURL 】
        canvasToBase64() {
            if (!this.canvas) {
                return console.warn("暂无 canvas");
            }
            this.base64 = this.canvas.toDataURL();
            const image = new Image();
            image.src = this.base64;
            this.refreshImageWrap(image);
            console.log("canvas => base64 / dataURL", this.base64);
        },
        // 【 base64 / dataURL => imageElement 】
        base64ToImageElement() {
            if (!this.base64) {
                return console.warn("暂无 base64");
            }

            const imgEl = new Image();

            imgEl.onload = () => {
                console.log("http link => image Element", imgEl);
                this.imageElement = imgEl;
                this.refreshImageWrap(imgEl);
            };

            imgEl.src = this.base64;
        },
        // 【 base64 / dataURL => ArrayBuffer 】
        base64ToArrayBuffer() {
            if (!this.base64) {
                return console.warn("暂无 base64");
            }
            // 参考 base64转译步骤 https://alanngai1996.xyz/screenshot/base64%E8%BD%AC%E8%AF%91%E6%AD%A5%E9%AA%A4.png
            const base64 = this.base64.replace(/^data\:([^\;]+)\;base64,/gim, "");
            const binary = atob(base64);
            const len = binary.length;
            const buffer = new ArrayBuffer(len); // 根据长度创建二进制缓冲区
            const view = new Uint8Array(buffer); // 创建视图操作
            for (let i = 0; i < len; i++) {
                view[i] = binary.charCodeAt(i); //获取字符串的Unicode
            }
            this.arrayBuffer = buffer;
            console.log("base64 / dataURL => ArrayBuffer", this.arrayBuffer);
        },
        // 【 ArrayBuffer => base64 / dataURL 】
        arrayBufferToBase64() {
            if (!this.arrayBuffer) {
                return console.warn("暂无 arrayBuffer");
            }

            // 方案一： btoa
            // const str = btoa(
            //     new Uint8Array(this.arrayBuffer).reduce(
            //         (data, byte) => data + String.fromCharCode(byte),
            //         ""
            //     )
            // );
            // this.base64 = `data:image/jpeg;base64,${str}`;

            // 方案二：buffer.toString
            this.base64 =
                "data:image/jpeg;base64," +
                Buffer.from(this.arrayBuffer, "base64").toString("base64");

            const image = new Image();
            image.src = this.base64;
            this.refreshImageWrap(image);
            console.log("canvas => base64 / dataURL", this.base64);
        },
        // 【 ArrayBuffer => Blob / File 】
        arrayBufferToBlob() {
            if (!this.arrayBuffer) {
                return console.warn("暂无 arrayBuffer");
            }
            this.blob = new Blob([this.arrayBuffer], { type: "image/jpeg" });
            console.log("ArrayBuffer => Blob / File", this.blob);
        },
        // 【 canvas => Blob / File 】
        canvasToBlob() {
            if (!this.canvas) {
                return console.warn("暂无 canvas");
            }

            this.canvas.toBlob(
                blob => {
                    this.blob = blob;
                    console.log("canvas => Blob / File", this.blob);
                },
                "image/jpeg",
                1
            );
        },
        // 【 Blob / File => blobURL / ObjectURL 】
        blobToURL() {
            if (!this.blob) {
                return console.warn("暂无 blob");
            }

            this.blobURL = window.URL.createObjectURL(this.blob);

            console.log("Blob / File => blobURL / ObjectURL", this.blobURL);
        },
        // 【 blobURL / ObjectURL => imageElement 】
        blobUrlToImageElement() {
            if (!this.blobURL) {
                return console.warn("暂无 blobURL");
            }

            const imgEl = new Image();

            imgEl.onload = () => {
                console.log("blobURL / ObjectURL => imageElement", imgEl);
                this.imageElement = imgEl;
                this.refreshImageWrap(imgEl);
            };

            imgEl.src = this.blobURL;
        },
        // 【 Blob / File => ArrayBuffer 】
        blobToArrayBuffer() {
            if (!this.blob) {
                return console.warn("暂无 blob");
            }

            this.blob.arrayBuffer().then(buffer => {
                this.arrayBuffer = buffer;
                console.log("Blob / File => ArrayBuffer", this.arrayBuffer);
            });
        },
        // 【 ArrayBuffer => TypedArray 】
        arrayBufferToTypeArray() {
            if (!this.arrayBuffer) {
                return console.warn("暂无 arrayBuffer");
            }
            this.typeArray = new Uint8Array(this.arrayBuffer);
            console.log("ArrayBuffer => TypedArray", this.typeArray);
        },
        // 【 TypedArray => ArrayBuffer 】
        typedArrayToArrayBuffer() {
            if (!this.typeArray) {
                return console.warn("暂无 typeArray");
            }
            this.arrayBuffer = this.typeArray.buffer;
            console.log("TypedArray => ArrayBuffer", this.arrayBuffer);
        },
        // 【 ArrayBuffer => DataView 】
        arrayBufferToDataView() {
            if (!this.arrayBuffer) {
                return console.warn("暂无 arrayBuffer");
            }
            this.dataView = new DataView(this.arrayBuffer);
            console.log("ArrayBuffer => DataView", this.dataView);
        },
        // 【 DataView => ArrayBuffer 】
        dataViewToArrayBuffer() {
            if (!this.dataView) {
                return console.warn("暂无 dataView");
            }
            this.arrayBuffer = this.dataView.buffer;
            console.log("DataView => ArrayBuffer", this.arrayBuffer);
        }
    },
    mounted() {}
};
</script>

<style lang="scss">
.image_trans {
    button {
        display: block;
    }

    .test-case {
        display: grid;
        grid-template-rows: 2;
        grid-template-columns: repeat(3, 1fr);
    }

    .option-group {
        display: inline-block;
        border: 1px dashed black;
        padding: 10px;
        height: 100px;
    }
}
</style>
