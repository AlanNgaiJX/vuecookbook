<template>
    <div id="DFS">
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
    </div>
</template>

<script>
export default {
    name: "DFS",
    components: {},
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
