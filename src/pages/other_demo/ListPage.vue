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
                    name: "海报生成 v1",
                    path: "/other_demo/poster_make_v1"
                },
                {
                    name: "海报生成 v1",
                    path: "/other_demo/poster_make_v2"
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
