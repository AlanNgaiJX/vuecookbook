<template>
    <div id="AlgorithmList" class="global-router-list">
        <h1 class="bigTitle">Algorithm</h1>
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
    name: "AlgorithmList",
    data() {
        return {
            list: [
                {
                    name: "深度遍历",
                    path: "/algorithm/DFS"
                },
                {
                    name: "广度遍历",
                    path: "/algorithm/BFS"
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
