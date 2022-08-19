<template>
    <div id="home" class="global-router-list">
        <h1 class="bigTitle" @click="test">Home</h1>
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
    name: "Home",
    data() {
        return {
            list: [
                {
                    name: "Cookbook",
                    path: "/cookbook"
                },
                {
                    name: "Hearth",
                    path: "/hearth"
                },
                {
                    name: "JsApi",
                    path: "/jsApi"
                },
                {
                    name: "ServiceApi",
                    path: "/serviceApi"
                },
                {
                    name: "Lodash",
                    path: "/lodash"
                },
                {
                    name: "Algorithm",
                    path: "/algorithm"
                },
                {
                    name: "Echart",
                    path: "/echart"
                }
            ]
        };
    },
    methods: {
        routeTo(path) {
            this.$router.push({
                path
            });
        },
        test(){
            console.log("hello world");
        }
    }
};
</script>

<style lang="scss"></style>
