<template>
    <div id="triangle">
        <FixedScrollView :position="['0.8rem', 0, 0, 0]">
            <div class="triangle-box1 box"></div>
            <div class="triangle-box2 box"></div>
            <div class="triangle-box3 box"></div>
        </FixedScrollView>
    </div>
</template>

<script>
import FixedScrollView from "@/components/common/fixedScrollView.vue";

export default {
    name: "triangle",
    components: {
        FixedScrollView
    }
};
</script>

<style lang="scss">
#triangle {
    .box {
        margin: 50px;
    }

    .triangle-box1 {
        background-color: pink;
        width: 0px;
        height: 0px;
        border: 50px solid pink;
        border-left-color: red;
        border-right-color: yellow;
        border-top-color: blue;
        border-bottom-color: green;
    }

    .triangle-box2 {
        width: 0px;
        height: 0px;
        border: 50px solid transparent;
        border-left-color: red;
    }

    .triangle-box3 {
        width: 100px;
        height: 100px;
        border: 1px solid red;
        position: relative;

        &::before {
            content: "";
            display: block;
            width: 0px;
            height: 0px;
            border: 20px solid transparent;
            border-left-color: red;
            position: absolute;
            right: -40px;
            top: 50%;
            margin-top: -20px;
        }

        &::after {
            content: "";
            display: block;
            width: 0px;
            height: 0px;
            border: 19px solid transparent;
            border-left-color: #ffffff;
            position: absolute;
            right: -38px;
            top: 50%;
            margin-top: -19px;
        }
    }
}
</style>
