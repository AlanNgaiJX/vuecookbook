<template>
    <div id="gaodeMapApi">
        <template v-if="$route.path === '/jsApi/gaodeMapApi'">
            <div class="exp-list">
                <div class="exp-item" @click="routeTo('/jsApi/gaodeMapApi/basicMap')">
                    基础地图
                </div>
                <div class="exp-item" @click="routeTo('/jsApi/gaodeMapApi/selectPosition')">
                    选址组件
                </div>
                <div class="exp-item" @click="routeTo('/jsApi/gaodeMapApi/districtMap')">
                    行政地图
                </div>
                <div class="exp-item" @click="routeTo('/jsApi/gaodeMapApi/locaDistrictMap')">
                    LOCA 行政地图
                </div>
                <div class="exp-item" @click="routeTo('/jsApi/gaodeMapApi/locaPointMap')">
                    LOCA 点图
                </div>
            </div>
        </template>
        <router-view v-if="AMapLoaded"></router-view>
    </div>
</template>

<script>
export default {
    name: "gaodeMapApi",
    components: {},
    data() {
        return {
            AMapLoaded: false
        };
    },
    methods: {
        routeTo(path) {
            this.$router.push({
                path
            });
        }
    },
    mounted() {
        /* 
            loca 2.0 对应 高德js api 2.0，
            示例: https://lbs.amap.com/api/loca-v2/intro
            文档：https://lbs.amap.com/api/loca-v2/api

            loca 1.3 对应 高德js api 1.4.15
            示例：https://lbs.amap.com/demo/list/loca-api
            文档：https://lbs.amap.com/api/loca-api/prod_intro
        */
        AMapLoader.load({
            key: "75d5d1cfb02ac4ccb4beb3d982897d4c", // 申请好的Web端开发者Key，首次调用 load 时必填
            // version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            version: "1.4.15",
            plugins: ['AMap.Scale', 'AMap.ToolBar'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            AMapUI: {
                // 是否加载 AMapUI，缺省不加载
                version: "1.1", // AMapUI 版本
                plugins: ["overlay/SimpleMarker"] // 需要加载的 AMapUI ui插件
            },
            Loca: {
                // 是否加载 Loca， 缺省不加载
                // version: "2.0" // Loca 版本
                version: "1.3.2"
            }
        })
            .then(AMap => {
                this.AMapLoaded = true;
            })
            .catch(e => {
                console.error(e); //加载错误提示
            });
    }
};
</script>

<style lang="scss">
#gaodeMapApi {
    .exp-list {
        padding: 10px;
        .exp-item {
            font-size: 36px;
            background-color: #eee;
            margin-bottom: 20px;
            cursor: pointer;
        }
    }
}
</style>
