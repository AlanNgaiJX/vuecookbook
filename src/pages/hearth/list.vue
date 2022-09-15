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
                    path: "/hearth/bubble_zoom"
                },
                {
                    name: "研究nextTick和setTimeOut",
                    path: "/hearth/exam_next_tick"
                },
                {
                    name: "grid布局",
                    path: "/hearth/grid_layout"
                },
                {
                    name: "弹性grid布局",
                    path: "/hearth/flexible_grid"
                },
                {
                    name: "水-进度条",
                    path: "/hearth/water_progress"
                },
                {
                    name: "三角形",
                    path: "/hearth/triangle"
                },
                {
                    name: "scoped",
                    path: "/hearth/scoped"
                },
                {
                    name: "纯css饼图",
                    path: "/hearth/pie_chart_css"
                },
                {
                    name: "自定义虚线边框",
                    path: "/hearth/custom_border"
                },
                {
                    name: "阻止唤起手机键盘",
                    path: "/hearth/prevent_mobile_keyboard"
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
