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
                    name: "youdao_ocr_api",
                    path: "/service_api/youdao_ocr_api"
                },
                {
                    name: "get_exif_data",
                    path: "/service_api/get_exif_data"
                },
                {
                    name: "new_get_exif_data",
                    path: "/service_api/new_get_exif_data"
                },
                {
                    name: "juejin_search",
                    path: "/service_api/juejin_search"
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