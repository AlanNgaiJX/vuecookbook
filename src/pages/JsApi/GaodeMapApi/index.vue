<template>
    <div id="gaodeMapApi">
        <template v-if="$route.path === '/jsApi/gaodeMapApi'">
            <FixedScrollView :position="['0.8rem', 0, 0, 0]">
                <div class="exp-list">
                    <div class="exp-item" @click="routeTo('/jsApi/gaodeMapApi/basicMap')">
                        基础地图
                    </div>
                    <div class="exp-item" @click="routeTo('/jsApi/gaodeMapApi/selectPosition')">
                        选址组件
                    </div>
                </div>
            </FixedScrollView>
        </template>
        <router-view></router-view>
    </div>
</template>

<script>
import FixedScrollView from "@/components/common/fixedScrollView.vue";
export default {
    name: "gaodeMapApi",
    components: {
        FixedScrollView
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

<style lang="scss">
#gaodeMapApi {
    .exp-list {
        padding: 1rem;
        .exp-item {
            font-size: 0.36rem;
            background-color: #eee;
            margin-bottom: 0.2rem;
            cursor: pointer;
        }
    }
}
</style>
