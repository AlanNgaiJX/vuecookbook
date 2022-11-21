<template>
  <div class="transparent_canvas">
    <button @click="init">抠图，下载</button>
  </div>
</template>

<script>
const img0 = require("@/assets/image/testTransparentCanvas/fa.jpg"); // 100 5600

export default {
  name: "transparent_canvas",
  data() {
    return {
      imageElement: null,
      canvas: null,
      imageData: null
    };
  },
  methods: {
    init(src) {
      const imgEl = new Image();

      imgEl.onload = () => {
        this.imageElement = imgEl;

        const canvas = document.createElement("canvas");
        canvas.width = this.imageElement.width;
        canvas.height = this.imageElement.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(this.imageElement, 0, 0);
        this.canvas = canvas;

        this.imageData = this.canvas
          .getContext("2d")
          .getImageData(0, 0, this.canvas.width, this.canvas.height);

        const imageData = this.imageData;
        for (var i = 0; i < imageData.data.length; i += 4) {
          // 当该像素是白色的，则设置成透明
          if (
            imageData.data[i] == 255 &&
            imageData.data[i + 2] == 255 &&
            imageData.data[i + 3] == 255
          ) {
            imageData.data[i] = 0;
            imageData.data[i + 1] = 0;
            imageData.data[i + 2] = 0;
            imageData.data[i + 3] = 0;
          }
        }

        const canvasOutput = document.createElement("canvas");
        canvasOutput.width = this.imageElement.width;
        canvasOutput.height = this.imageElement.height;

        canvasOutput.getContext("2d").putImageData(imageData, 0, 0);
        const url = canvasOutput.toDataURL("image/png");

        const downloadAnchorNode = document.createElement("a");
        downloadAnchorNode.setAttribute("href", url);
        downloadAnchorNode.setAttribute("download", `透明.png`);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
      };

      imgEl.src = src;
    }
  },
};
</script>
