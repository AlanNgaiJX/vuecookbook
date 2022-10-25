<template>
    <div id="JsApiList" class="global-router-list">
        <h1 class="bigTitle">JsApi</h1>
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
    name: "JsApiList",
    data() {
        return {
            list: [
                {
                    name: "web_audio_api",
                    path: "/js_api/web_audio_api"
                },
                {
                    name: "gaode_map_api",
                    path: "/js_api/gaode_map_api"
                },
                {
                    name: "Colorthief",
                    path: "/js_api/colorthief"
                },
                {
                    name: "oss_upload",
                    path: "/js_api/oss_upload"
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
