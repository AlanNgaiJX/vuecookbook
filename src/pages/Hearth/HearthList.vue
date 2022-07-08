<template>
    <div id="HearthList" class="global-router-list">
        <h1 class="bigTitle">Hearth</h1>
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
    name: "HearthList",
    data() {
        return {
            list: [
                {
                    name: "泡泡缩放",
                    path: "/hearth/bubbleZoom"
                },
                {
                    name:"研究nextTick和setTimeOut",
                    path: "/hearth/examNextTick" 
                },
                {
                    name:"grid布局",
                    path:"/hearth/gridLayout"
                },
                {
                    name:"弹性grid布局",
                    path:"/hearth/flexibleGrid"
                },
                {
                    name:"水-进度条",
                    path:"/hearth/waterProgress"
                },
                {
                    name:"三角形",
                    path:"/hearth/triangle"
                },
                {
                    name:"scoped",
                    path:"/hearth/scoped"
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