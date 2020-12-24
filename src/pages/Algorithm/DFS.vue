<template>
    <div id="DFS">
        <FixedScrollView :position="['0.8rem', 0, 0, 0]">
                <!-- 深度优先算法，遍历这个dom树 -->
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
        const rootEl = document.getElementById('root');
        const result = [];
        // 递归遍历
        (function dig(el){
            result.push(el);
            for (const child of el.children) {
                dig(child);
            }
        })(rootEl);

        console.log(result);
        /* 
            0: div#root.root
            1: div.container
            2: section.sidebar
            3: ul.menu
            4: section.main
            5: article.post
            6: p.copyright
        */
    },
};
</script>

<style lang="scss">
#DFS {
}
</style>
