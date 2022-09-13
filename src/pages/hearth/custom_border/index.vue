<template>
    <div class="custom-border">
        <div class="border-div"></div>
        <div class="dash-line"></div>
    </div>
</template>

<style lang="scss">
.custom-border {
    padding: 100px;
    .border-div {
        width: 200px;
        height: 50px;
        border: 1px dashed transparent;
        background: linear-gradient(white, white) padding-box,
            repeating-linear-gradient(-45deg, #b6b6b6 0, #b6b6b6 0.25em, white 0, white 0.75em);
        // 调整 0.25 和 0.75 到想要的效果
    }

    .dash-line {
        flex: 1;
        height: 3px;
        background-image: linear-gradient(to right, #e2e2e2 0%, #e2e2e2 50%, transparent 50%);// 调整下 50% 看到间隙
        background-size: 20px 3px;// 调整 20px 看到间隙
        background-repeat: repeat-x;
        margin-top: 100px;
    }
}
</style>
