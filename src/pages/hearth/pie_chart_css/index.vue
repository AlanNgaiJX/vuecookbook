<!-- css圆饼图 -->
<template>
    <div class="pie">
        <!-- 左右半圆饼 -->
        <div class="left-bg">
            <div class="value" :style="leftValStyle"></div>
        </div>
        <div class="right-bg">
            <div class="value" :style="rightValStyle"></div>
        </div>

        <!-- 指针 -->
        <div class="start-pointer"></div>
        <div class="end-pointer" :style="endPointerStyle"></div>

        <div class="inner-circle">
            <!-- 这里面可以扩展文字 -->
        </div>
    </div>
</template>

<script>
export default {
    name: "pie-chat",
    props: {
        percent: {
            type: Number,
            default: 0.75
        }
    },
    computed: {
        leftValStyle() {
            const styleSheet = {};
            if (this.percent > 0.5) {
                styleSheet.transform = `rotateZ(${360 * (this.percent - 0.5)}deg)`;
            }
            return styleSheet;
        },
        rightValStyle() {
            const styleSheet = {};
            if (this.percent <= 0.5) {
                styleSheet.transform = `rotateZ(${360 * this.percent}deg)`;
            } else {
                styleSheet.transform = `rotateZ(180deg)`;
            }
            return styleSheet;
        },
        endPointerStyle() {
            return {
                transform: `rotateZ(${360 * this.percent}deg)`
            };
        }
    }
};
</script>

<style lang="scss">
$pieAbientColor: #fff;
$pieBgColor: #4c93f1;
$pieValColor: #9f94f0;
$pie-size: 80px;
$inner-circle-size: 60%;

.pie {
    width: $pie-size;
    height: $pie-size;
    position: relative;
    display: flex;

    .inner-circle {
        position: absolute;
        width: $inner-circle-size;
        height: $inner-circle-size;
        background-color: $pieAbientColor;
        border-radius: 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .start-pointer {
        width: 2px;
        height: 50%;
        position: absolute;
        background-color: $pieAbientColor;
        left: 50%;
    }

    .end-pointer {
        width: 2px;
        height: 50%;
        position: absolute;
        background-color: $pieAbientColor;
        left: 50%;
        transform-origin: center bottom;
    }

    .left-bg,
    .right-bg {
        width: $pie-size / 2;
        height: $pie-size;
        overflow: hidden;
        position: relative;
        background-color: $pieValColor;

        .value {
            position: absolute;
            display: block;
            width: 100%;
            height: 100%;
            background-color: $pieBgColor;
        }
    }

    .left-bg {
        border-radius: $pie-size 0 0 $pie-size;

        .value {
            border-radius: $pie-size 0 0 $pie-size;
            transform-origin: right center;
        }
    }

    .right-bg {
        border-radius: 0 $pie-size $pie-size 0;

        .value {
            border-radius: 0 $pie-size $pie-size 0;
            transform-origin: left center;
        }
    }
}
</style>
