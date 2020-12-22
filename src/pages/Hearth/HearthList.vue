<template>
    <div id="HearthList">
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
                    name:"水-进度条",
                    path:"/hearth/waterProgress"
                },
                {
                    name:"三角形",
                    path:"/hearth/triangle"
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

<style lang="scss" scoped>
#HearthList {
    display: flex;
    justify-content: center;
    padding-top: 1rem;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;

    .bigTitle {
        margin-bottom: 0.8rem;
    }

    .list {
        font-size: 0.32rem;
        // width: 3rem;

        li {
            color: #ffffff;
            background-color: blue;
            margin-top: 0.1rem;
            padding: 0.1rem;
            box-sizing: border-box;
            cursor: pointer;

            .num {
                margin-right: 0.2rem;
            }

            .name {
                font-weight: bold;
            }
        }
    }
}
</style>
