<template>
    <div id="bubbleZoom">
        <FixedScrollView :position="['0.8rem', 0, 0, 0]">
            <button @click="showPannel = !showPannel">switch</button>
            <!-- <transition enter-active-class="">
            
            </transition> -->
            <div class="pannel" v-show="showPannel"></div>
        </FixedScrollView>
    </div>
</template>

<script>
import FixedScrollView from "@/components/common/fixedScrollView.vue";
export default {
    name: "bubbleZoom",
    components: {
        FixedScrollView
    },
    data() {
        return {
            showPannel: false
        };
    }
};
</script>

<style lang="scss" scoped>
#bubbleZoom {
    .pannel{
        width: 4.5rem;
        height: 4.5rem;
        background-color: pink;
    }
}
</style>
