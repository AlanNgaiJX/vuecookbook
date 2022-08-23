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
                    name: "cookbook",
                    path: "/cookbook"
                },
                {
                    name: "hearth",
                    path: "/hearth"
                },
                {
                    name: "js_api",
                    path: "/js_api"
                },
                {
                    name: "service_api",
                    path: "/service_api"
                },
                {
                    name: "lodash",
                    path: "/lodash"
                },
                {
                    name: "algorithm",
                    path: "/algorithm"
                },
                {
                    name: "echart",
                    path: "/echart"
                },
                {
                    name: "keep_alive_refresh",
                    path: "/keep_alive_refresh"
                },
                {
                    name: "other_demo",
                    path: "/other_demo"
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
        test() {
            console.log("hello world");
        }
    }
};
</script>

<style lang="scss">
#home {
}
</style>
