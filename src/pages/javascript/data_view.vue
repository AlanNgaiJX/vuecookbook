<!--
  参考: https://juejin.cn/post/6962563491580346376?share_token=c5d419a4-3a05-4afa-a2ec-a3e6f6d2cdd9#heading-9 从Exifjs的原理入手，搞定js二进制数据的操作
  附件：typeArray类型 https://alanngai1996.xyz/screenshot/typeArray%E7%B1%BB%E5%9E%8B.webp

-->
<template>
    <div class="data-view">
        <p>该实例请看代码部分,并配合按钮log调试</p>
        <button @click="eg1">打印例一</button>
        <button @click="eg2">打印例二</button>
    </div>
</template>

<script>
export default {
    name: "data-view",
    methods: {
        // 【 例一 】
        eg1() {
            const buffer = new ArrayBuffer(10);
            const view1 = new Int8Array(buffer); // typeArray
            view1[1] = 2; // 这个操作最终影响到 buffer

            const view2 = new DataView(buffer, 1, 2); // 二参：byteOffset 三参：byteLength
            // buffer 偏移 1 byte 取长度 2 创建视图

            console.log(view2);
            /*
              DataView {
                byteLength: 2,
                byteOffset: 1,
                buffer: ArrayBuffer {
                  [Uint8Contents]: <00 02 00 00 00 00 00 00 00 00>,// 这种是 用两位16进制来简单表示一个byte 即 02 FF = 00000010 | 111111111
                  byteLength: 10
                }
              }
            */
            console.log(view2.getInt8(0)); // 即 00000010 = 2
            console.log(view2.getInt16(0)); //一次获取两个字节 即 00000010 | 00000000 = 512
            console.log(view2.getInt16(1)); //Offset is outside the bounds of the DataView，因为视图只有 2 byte 长度，这里取到4 byte 超过了视图长度
        },
        // 【 例二 】
        eg2() {
            const buffer = new ArrayBuffer(8);
            const view = new DataView(buffer);
            view.setUint16(0, 255);// 即 00000000 | 11111111 | (...后面还有 6 byte)
            console.log(view.getUint16(0)); // 即取 00000000 | 11111111 | = 255 
            console.log(view.getUint8(0)); // 即取 第一个byte 00000000 = 0
            console.log(view.getUint8(1)); // 即取 第二个byte 11111111 = 255
        }
    }
};
</script>
