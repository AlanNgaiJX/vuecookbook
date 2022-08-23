<template>
    <div id="jsApi">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "JsApi",
    components: {},
    computed: {
        showHead() {
            return !this.$route.meta.noCommonHead;
        }
    }
};
</script>

<style lang="scss" scoped>
#jsApi {
}
</style>
