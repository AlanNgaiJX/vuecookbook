<template>
    <div id="getExifData">
        <button class="btn" @click="chooseImage">选择图片</button>
        <div class="shootime" v-text="shootTime"></div>
        <input
            type="file"
            id="getExifData_fileInput"
            accept="image/*"
            v-show="false"
            @change="handleInputChange"
        />
    </div>
</template>

<script>
import FixedScrollView from "@/components/common/fixedScrollView.vue";

export default {
    name: "getExifData",
    components: {
        FixedScrollView
    },
    data() {
        return {
            shootTime: "???"
        };
    },
    methods: {
        chooseImage() {
            var clickEvent = new MouseEvent("click");
            var input = document.getElementById("getExifData_fileInput");
            input.dispatchEvent(clickEvent);
        },

        handleInputChange(e) {
            var file = e.target.files[0];
            var that = this;
            EXIF.getData(file, function() {
                console.log(this);
                var shootTime = 0;
                try {
                    shootTime =
                        EXIF.getTag(this, "DateTime") ||
                        EXIF.getTag(this, "DateTimeOriginal") ||
                        EXIF.getTag(this, "DateTimeDigitized");
                } catch (error) {
                    alert(error);
                }
                that.shootTime = shootTime || "无信息"
            });
        }
    }
};
</script>

<style lang="scss" scoped>
#getExifData {
    .btn {
        margin-top: 50px;
    }
    .shootime {
        font-size: 28px;
    }
}
</style>
