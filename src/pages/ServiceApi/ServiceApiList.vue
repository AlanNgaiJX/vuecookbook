<template>
    <div id="serviceApiList" class="global-router-list">
        <h1 class="bigTitle">serviceApi</h1>
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
    name: "serviceApiList",
    data() {
        return {
            list: [
                {
                    name: "youdaoOcrApi",
                    path: "/serviceApi/youdaoOcrApi"
                },
                {
                    name: "getExifData",
                    path: "/serviceApi/getExifData"
                },
                {
                    name: "newGetExifData",
                    path: "/serviceApi/newGetExifData"
                },
                {
                    name: "juejinSearch",
                    path: "/serviceApi/juejinSearch"
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