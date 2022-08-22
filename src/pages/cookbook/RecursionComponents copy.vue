<template>
    <div id="RecursionComponents">
        <FixedScrollView :position="['0.8rem', 0, 0, 0]">
            <div class="viewContent">
                <h1>RecursionComponents</h1>
                <h3>递归组件：</h3>
            </div>
        </FixedScrollView>
    </div>
</template>

<script>
import FixedScrollView from "@/components/common/fixedScrollView.vue";

export default {
    name: "RecursionComponents",
    components: {
        FixedScrollView
    }
};
</script>

<style lang="scss" scoped>
#RecursionComponents {
    .viewContent {
        padding: 0.5rem;
    }
}
</style>
