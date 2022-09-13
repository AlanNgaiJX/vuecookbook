<template>
    <div class="custom-border">
        <div class="border-div"></div>
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
}
</style>
