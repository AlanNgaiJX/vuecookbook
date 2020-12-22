<template>
    <div id="youdaoOcrApi">
        <FixedScrollView :position="['0.8rem', 0, 0, 0]">
            <button @click="selectImage">选择图片</button>
            <div v-if="queueStatus">
                <button @click="downLoadAllTextOnce">合并下载所有文本</button>
                <button @click="downLoadAllText">单独下载所有文本</button>
                <button @click="downLoadAllJsonOnce">合并下载所有请求</button>
                <button @click="downLoadAllJson">单独下载所有请求</button>
            </div>

            <ul class="fetchingQueueList">
                <li class="fetchingQueueItem" v-for="(item, index) in fetchingQueue" :key="item.id">
                    <div class="fileName" v-text="item.id"></div>
                    <div class="fetchingState">{{ item.fetched | fetchedState }}</div>
                    <div class="btn-group" v-if="item.fetched">
                        <div class="btn btn-downTxt" @click="downLoadText(index)">下载文本</div>
                        <div class="btn btn-downJson" @click="downLoadJson(index)">下载请求</div>
                        <div class="btn btn-downBoth" @click="downLoadBoth(index)">全部下载</div>
                    </div>
                </li>
            </ul>
            <input
                type="file"
                accept="image/*"
                id="fileInput"
                multiple="multiple"
                @change="handleSelectImage($event)"
                v-show="false"
            />
        </FixedScrollView>
    </div>
</template>

<script>
import axios from "axios";
import sha256 from "sha256";
import qs from "qs";

import FixedScrollView from "@/components/common/fixedScrollView.vue";

export default {
    name: "youdaoOcrApi",
    components: {
        FixedScrollView
    },
    data() {
        return {
            config: {
                URL: "/youdao/ocrapi", //https://openapi.youdao.com/ocrapi
                APP_KEY: "54a786eec41bd20b",
                SEC_KEY: "cdJTmjF6cnQtG8FfOavwWykED8hwtwA5"
            },

            params: {
                langType: "zh-CHS", //zh-CHS 中文简体  zh-CHT 中文繁体 en英文 ja 日文 auto 自动
                detectType: "10012",
                imageType: "1",
                appKey: "",
                docType: "json",
                signType: "v3",
                curtime: "",
                salt: "",
                sign: "",
                img: "" //去除头的base64，建议小于1M，不可大于2M
            },

            fetchingQueue: [],
            queueStatus: 0 // 0 :未完成 1:全部已完成
        };
    },
    filters: {
        fetchedState(state) {
            return state ? "fetched" : "fetching...";
        }
    },
    methods: {
        // 【base64去头】
        getBase64(data) {
            return data.slice(data.indexOf(",") + 1);
        },

        //
        getBase64Size(base64) {
            var eqTagIndex = base64.indexOf("=");
            base64 = eqTagIndex != -1 ? base64.substring(0, eqTagIndex) : base64;

            return base64.length - (base64.length / 8) * 2;
        },

        getInput(base64) {
            var length = base64.length;
            var result = "";

            if (length < 20) {
                result = base64;
            } else {
                result = base64.slice(0, 10) + length + base64.slice(-10);
            }

            return result;
        },

        getSalt() {
            var result = "";

            const length = 10;
            for (let i = 0; i < length; i++) {
                result += Math.random().toFixed(1) * 10 + "";
            }

            return result;
        },

        getCurrTime() {
            return Math.round(new Date().getTime() / 1000);
            getTime();
        },

        getSign(base64) {
            var appKey = (this.params.appKey = this.config.APP_KEY);
            var input = this.getInput(base64);
            var salt = (this.params.salt = this.getSalt());
            var curtime = (this.params.curtime = this.getCurrTime() + "");
            var secKey = this.config.SEC_KEY;
            return sha256(appKey + input + salt + curtime + secKey);
        },

        ocr(params) {
            return axios.post(this.config.URL, qs.stringify(params), {
                headers: { "content-type": "application/x-www-form-urlencoded" },
                withCredentials: true
            });
        },

        fetchOcr(base64) {
            var addition = {
                sign: this.getSign(base64),
                img: base64
            };

            Object.assign(this.params, addition);

            return this.ocr(this.params);
        },

        selectImage() {
            var clickEvent = new MouseEvent("click");
            document.getElementById("fileInput").dispatchEvent(clickEvent);
        },

        readFile(file) {
            return new Promise((resolve, reject) => {
                var fileReader = new FileReader();
                fileReader.addEventListener(
                    "load",
                    () => {
                        var base64 = this.getBase64(fileReader.result);
                        // console.log("文件大小：", this.getBase64Size(base64) / 1024 / 1024 + "M");
                        if (this.getBase64Size(base64) / 1024 / 1024 > 1) {
                            reject({ base64: "", msg: "文件大于1M,无法扫描" });
                        } else {
                            resolve({ base64, msg: "解析成功" });
                        }
                    },
                    false
                );

                fileReader.readAsDataURL(file);
            });
        },

        getFileName(fileName) {
            return fileName.split(".")[0];
        },

        getFileId(fileName) {
            return this.getFileName(fileName) + "_timeAt_" + this.getCurrTime();
        },

        sortFilesByName(files) {
            const tagReg = /\$(\d+)\$/;
            const tagReg2 = /^\d+$/;
            var sortList = [];
            var unSortList = [];

            files.forEach(file => {
                var fileName = this.getFileName(file.name);

                if (fileName.match(tagReg)) {
                    //匹配“$数字$”
                    file.sortTag = parseInt(matchResult[1]);
                    sortList.push(file);
                } else if (tagReg2.test(fileName)) {
                    //匹配全数字
                    file.sortTag = parseInt(fileName);
                    sortList.push(file);
                } else {
                    unSortList.push(file);
                }
            });

            sortList.sort((fileA, fileB) => {
                return fileA.sortTag - fileB.sortTag;
            });

            return sortList.concat(unSortList);
        },

        async handleSelectImage(e) {
            var files = e.target.files;
            files = this.sortFilesByName(files);

            var queue = [];
            for (const file of files) {
                var { base64, msg } = await this.readFile(file);
                if (base64.length) {
                    queue.push({
                        base64,
                        fileName: file.name,
                        id: this.getFileId(file.name),
                        fetched: false
                    });
                } else {
                    console.log(file.name, msg);
                }
            }

            this.execQueue(queue);
        },

        async execQueue(queue) {
            this.fetchingQueue = queue;
            this.fetchingQueue.forEach(item => {
                this.fetchOcr(item.base64)
                    .then(res => {
                        item.res = res;
                    })
                    .catch(err => {
                        item.err = err;
                    })
                    .finally(() => {
                        item.fetched = true;
                        if (this.checkQueueAllDone()) {
                            console.log("队列已完成");
                            this.queueStatus = 1;
                        }
                    });
            });
        },

        checkQueueAllDone() {
            var count = 0;
            this.fetchingQueue.forEach(item => {
                item.fetched && count++;
            });
            var isDone = count === this.fetchingQueue.length;

            return isDone;
        },

        downLoadAllTextOnce() {
            var allText;
            this.fetchingQueue.forEach(item => {
                var { res, id } = item;
                var txtContent = this.resolveOcrRes(res);
                allText += txtContent + "\n";
            });
            this.execDownLoadTxt(allText, this.getCurrTime());
        },
        downLoadAllText() {
            this.fetchingQueue.forEach((item, index) => {
                this.downLoadText(index);
            });
        },
        downLoadAllJsonOnce() {
            this.execDownLoadJson(this.fetchingQueue, this.getCurrTime());
        },
        downLoadAllJson() {
            this.fetchingQueue.forEach((item, index) => {
                this.downLoadJson(index);
            });
        },

        downLoadText(index) {
            var { res, id } = this.fetchingQueue[index];
            var txtContent = this.resolveOcrRes(res);
            this.execDownLoadTxt(txtContent, id);
        },
        downLoadJson(index) {
            var { res, id } = this.fetchingQueue[index];
            this.execDownLoadJson(res, id);
        },
        downLoadBoth(index) {
            this.downLoadText(index);
            this.downLoadJson(index);
        },

        execDownLoadJson(obj, name) {
            var datastr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
            var downloadAnchorNode = document.createElement("a");
            downloadAnchorNode.setAttribute("href", datastr);
            downloadAnchorNode.setAttribute("download", name + ".json");
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        },

        execDownLoadTxt(textContent, name) {
            var datastr = "data:text/plain;charset=utf-8," + encodeURIComponent(textContent);

            var downloadAnchorNode = document.createElement("a");
            downloadAnchorNode.setAttribute("href", datastr);
            downloadAnchorNode.setAttribute("download", name + ".txt");
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        },

        resolveOcrRes(obj) {
            if (obj.data.errorCode != 0) return ""; //没有识别结果

            var txtContent = "";
            var result = obj.data.Result;

            result.regions.forEach(region => {
                var regionTxt = "";
                region.lines.forEach(line => {
                    regionTxt += line.text + "\n";
                });

                txtContent += regionTxt + "\n";
            });

            return txtContent;

            var arr = ["珮", "姵", "琇", "瑄", "旻", "淩", "璟", "佈", "乂"];
        }
    },
    mounted() {}
};
</script>

<style lang="scss" scoped>
#youdaoOcrApi {
    .fetchingQueueList {
        margin-top: 0.8rem;

        .fetchingQueueItem {
            box-shadow: 0 2px 27px 6px rgba(0, 0, 0, 0.12);
            margin-bottom: 0.2rem;

            .btn-group {
                display: flex;

                .btn {
                    margin-right: 0.2rem;
                }
            }
        }
    }
}
</style>
