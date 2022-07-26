<template>
    <div id="EchartList" class="global-router-list">
        <h1 class="bigTitle">Echart</h1>
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
    name: "EchartList",
    data() {
        return {
            list: [
                {
                    name: "下探地图",
                    path: "/echart/map"
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
