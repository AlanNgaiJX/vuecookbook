<template>
    <div id="CookbookList">
        <h1 class="bigTitle">Cookbook</h1>
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
    name: "CookbookList",
    data() {
        return {
            list: [
                {
                    name: "动态组件",
                    path: "/cookbook/dynamicComponents"
                },
                {
                    name: "异步组件",
                    path: "/cookbook/asyncComponents"
                },
                {
                    name:"递归组件",
                    path:"/cookbook/recursionComponents"
                },
                {
                    name: "$on，$off，$once",
                    path: "/cookbook/manualListen"
                }
            ]
        };
    },
    methods:{
        routeTo(path){
            this.$router.push({
                path
            })
        }
    }
};
</script>

<style lang="scss" scoped>
#CookbookList {
    display: flex;
    justify-content: center;
    padding-top: 1rem;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;

    .bigTitle{
        margin-bottom: .8rem;
    }

    .list {
        font-size: 0.32rem;
        // width: 3rem;

        li {
            color: #ffffff;
            background-color: blue;
            margin-top: 0.1rem;
            padding: .1rem;
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
