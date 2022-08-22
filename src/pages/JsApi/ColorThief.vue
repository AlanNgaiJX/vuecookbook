<template>
    <div class="color-thief">
        <el-form
            class="form shadow-border"
            ref="form"
            label-position="top"
            :model="form"
            :rules="rules"
            label-width="200px"
        >
            <el-form-item label="输入图片地址" prop="path">
                <el-input type="text" v-model="form.inputImgSrc" clearable></el-input>
            </el-form-item>
            <el-button type="primary" @click="onSubmit">查看</el-button>
        </el-form>

        <div
            class="img-wrap"
            ref="img-wrap"
            :style="{
                'background-color': bg
            }"
        >
            <img :src="form.inputImgSrc" alt="" />
        </div>
    </div>
</template>

<script>
import ColorThief from "colorthief/dist/color-thief.mjs";

export default {
    name: "color-thief",
    data() {
        return {
            form: {
                inputImgSrc: ""
            },
            rules: {
                inputImgSrc: [{ required: true, message: "请输入图片路径", trigger: "blur" }]
            },
            img: null,
            bg: null
        };
    },
    methods: {
        onSubmit() {
            this.getThemeColor();
        },
        getThemeColor() {
            const img = new Image();
            img.setAttribute("crossOrigin", "Anonymous");
            img.onload = () => {
                try {
                    const rgbVal = new ColorThief().getColor(img).join(",");
                    this.bg = `rgba(${rgbVal}, 1)`;
                } catch (error) {
                    console.log(error);
                }
            };
            img.src = this.form.inputImgSrc;
        }
    }
};
</script>

<style lang="scss">
.color-thief {
    .form {
        width: 400px;
        padding: 30px;
    }

    .img-wrap {
        width: 600px;
        height: 400px;
        background-color: #eee;
        border: 1px solid #000;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 300px;
            height: auto;
        }
    }
}
</style>
