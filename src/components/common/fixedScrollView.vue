<template>
    <div id="fixedScrollView" class="canScroll" :style="viewStyle">
        <slot>content....</slot>
    </div>
</template>

<script>
export default {
    name: "fixedScrollView",
    props: {
        position: {
            type: Array,
            required: true
        },
        bgc: {
            type: String,
            default: "#ffffff"
        },
        zIndex: {
            type: Number,
            default: 1
        }
    },
    computed: {
        viewStyle() {
            return {
                top: `${this.position[0]}`,
                right: `${this.position[1]}`,
                bottom: `${this.position[2]}`,
                left: `${this.position[3]}`,
                zIndex: this.zIndex,
                backgroundColor: this.bgc
            };
        }
    }
};
</script>

<style lang="scss">
#fixedScrollView {
    position: fixed;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
</style>
