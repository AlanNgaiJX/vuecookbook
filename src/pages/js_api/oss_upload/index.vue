<template>
  <div class="oss-upload">
    <button @click="chooseImage">选择图片</button>
    <button @click="toggleDebug" v-if="uploader">debug:{{ uploader.debug }}</button>
    <div v-if="uploader">
      <p>waitingQueue: {{ uploader.waitingQueue.length }}</p>
      <p>uploadingQueue: {{ uploader.uploadingQueue.length }}</p>
      <p>uploadedQueue: {{ uploader.uploadedQueue.length }}</p>
      <p>errorQueue: {{ uploader.errorQueue.length }}</p>
      <p>speed: {{ uploadSpeed }}</p>
    </div>
    <button @click="retryErrorQueue">retryErrorQueue</button>
    <div>
      <input type="text" v-model="errorTaskId" />
      <button @click="retryErrorTask">retryErrorTask</button>
    </div>
    <div>
      <input type="text" v-model="removeTaskId" />
      <button @click="removeTask">removeTask</button>
    </div>
    <input
      id="file"
      type="file"
      accept="image/*"
      v-show="false"
      @change="handleSelectFiles"
      multiple
    />
  </div>
</template>

<script>
// import Uploader from "D:/Desktop/alan/mine/alanngai-oss-web-uploader/dist/alanngai-oss-web-uploader.js";
import Uploader from "./uploader";
import axios from "axios";

export default {
  name: "oss-upload",
  data() {
    return {
      uploader: null,
      errorTaskId: "",
      removeTaskId: ""
    };
  },
  computed: {
    uploadSpeed() {
      return Uploader.parseBufferSpeed(this.uploader.bufferSpeed);
    }
  },
  methods: {
    chooseImage() {
      const clicker = new MouseEvent("click");
      document.getElementById("file").dispatchEvent(clicker);
    },
    handleSelectFiles(e) {
      this.uploader.uploadFiles({
        files: e.target.files,
        onComputedId: this.onComputedId,
        onComputedMd5: this.onComputedMd5,
        onProgress: this.onProgress,
        onSuccess: this.onSuccess,
        onAllFinish: this.onAllFinish,
        onAllSuccess: this.onAllSuccess,
        onError: this.onError
      });

      e.target.value = null;
    },
    getUploadSignature() {
      return new Promise((resolve, reject) => {
        axios
          .post(
            "/egg/admin/get_upload_signature",
            {},
            {
              headers: {
                pwd: 19840228
              }
            }
          )
          .then(result => {
            if (result.data.errcode === 0) {
              resolve(result.data.data);
            } else {
              reject();
            }
          })
          .catch(err => {
            reject();
          });
      });
    },
    onComputedId(uploadTask) {
      console.log("onComputedId ", uploadTask);
    },
    onComputedMd5(uploadTask) {
      console.log("onComputedMd5 ", uploadTask);
    },
    onProgress(uploadTask) {
      console.log("onProgress ", uploadTask, uploadTask.progress);
    },
    onSuccess(uploadTask, existCount) {
      console.log("onSuccess ", uploadTask, existCount);
    },
    onAllFinish() {
      console.log("全部任务已执行");
    },
    onAllSuccess() {
      console.log("全部上传成功");
    },
    onError(uploadTask) {
      console.log("onError ", uploadTask);
    },

    // 【 切换调试 】
    toggleDebug() {
      this.uploader.toggleDebug();
    },

    // 【 重试所有失败任务 】
    retryErrorQueue() {
      this.uploader.retryErrorQueue();
    },

    // 【 重试单个失败任务 】
    retryErrorTask() {
      this.uploader.retryErrorTaskById(this.errorTaskId);
    },

    // 【 删除任务 】
    removeTask() {
      this.uploader.delTaskById(this.removeTaskId);
    }
  },
  mounted() {
    this.uploader = new Uploader(this.getUploadSignature);
  }
};
</script>
