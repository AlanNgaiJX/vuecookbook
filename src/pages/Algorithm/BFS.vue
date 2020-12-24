<template>
    <div id="DFS">
        <FixedScrollView :position="['0.8rem', 0, 0, 0]">
            <!-- 广度优先算法，遍历这个dom树 -->
            <div id="root" class="root">
                <div class="container">
                    <section class="sidebar">
                        <ul class="menu"></ul>
                    </section>
                    <section class="main">
                        <article class="post"></article>
                        <p class="copyright"></p>
                    </section>
                </div>
            </div>
        </FixedScrollView>
    </div>
</template>

<script>
import FixedScrollView from "@/components/common/fixedScrollView.vue";

export default {
    name: "DFS",
    components: {
        FixedScrollView
    },
    mounted() {
        const rootEl = document.getElementById("root");

        function checkQueue(rootNode) {
            const result = [];
            const queue = [rootNode];

            while (queue.length) {
                const el = queue.shift();
                result.push(el);
                for (const child of el.children) {
                    queue.push(child);
                }
            }
            console.log(result);
        }
        checkQueue(rootEl);
    }
};
</script>

<style lang="scss">
#DFS {
}
</style>
