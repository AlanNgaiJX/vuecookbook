<template>
    <div id="list-page" class="global-router-list">
        <h1 class="bigTitle">Other Demo</h1>
        <ul class="list">
            <li v-for="(item, index) in list" :key="index" @click="routeTo(item.path)">
                <span v-text="index + 1 + '.'" class="num"></span
                ><span class="name" v-text="item.name"></span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "list-page",
    data() {
        return {
            list: [
                {
                    name: "海报生成",
                    path: "/other_demo/poster_make"
                },
                {
                    name: "bs无限滚动",
                    path: "/other_demo/better_scroll_infinity"
                }
            ]
        };
    },
    methods: {
        routeTo(path) {
            this.$router.push({
                path
            });
        }
    }
};
</script>
