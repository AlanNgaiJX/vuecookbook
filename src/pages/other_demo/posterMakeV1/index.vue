<template>
    <div class="make-poster">
        <div>版本一：</div>
        <div class="poster-wrap">
            <el-image :src="posterV1" />
        </div>
        <el-divider>分割线</el-divider>
        <div>版本二：文字不限长度，根据长度海报撑高</div>
        <div class="poster-wrap">
            <el-image :src="posterV2" />
        </div>
    </div>
</template>

<script>
import generatePosterV1 from "./generatePoster.js";
import generatePosterV2 from "./generatePosterV2.js";

export default {
    name: "make-poster",
    data() {
        return {
            posterData: {
                QR_code_url:
                    "http://mcc0507.oss-cn-shenzhen.aliyuncs.com/marketing_activity/mini_program/62eb2be2e221ae74050040e7.jpg",
                time_begin: "2022-08-04 00:00",
                time_end: "2022-08-07 00:00",
                name: "雷克萨斯七夕老友记 · 您有4000元油卡待领取，请注意活动动向",
                cover_url:
                    "https://mcc0507.oss-cn-shenzhen.aliyuncs.com/marketing_activity/62eb2b97cde5c17e8d012918/2f5c57b632.jpg",
                instructions:
                    "心有欢喜 爱有引力\n雷克萨斯老友记·七夕专属礼遇 \n#转介绍购车至高享4000元油卡 \n#转发图片集赞满128个享LEXUS亲亲小熊\n（扫描二维码报名，获取活动详情）\n注：活动仅衡阳美东雷克萨斯老客户参与有效 ",
                bg_url: "https://alanngai1996.xyz/store/temp/posterBg.png"
            },
            posterV1: "",
            posterV2: ""
        };
    },
    methods: {
        async generatePosterV1() {
            const { posterCanvas, posterUrl, download } = await generatePosterV1(this.posterData);
            this.posterV1 = posterUrl;
        },
        async generatePosterV2() {
            const { posterCanvas, posterUrl, download } = await generatePosterV2(this.posterData);
            this.posterV2 = posterUrl;
        }
    },
    mounted() {
        this.generatePosterV1();
        this.generatePosterV2();
    }
};
</script>

<style lang="scss">
.make-poster {
    .poster-wrap {
        width: 300px;
        position: relative;

        img {
            width: 100%;
        }
    }
}
</style>
