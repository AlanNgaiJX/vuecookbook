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
            </div>
        </template>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "gaodeMapApi",
    components: {},
    methods: {
        routeTo(path) {
            this.$router.push({
                path
            });
        }
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
