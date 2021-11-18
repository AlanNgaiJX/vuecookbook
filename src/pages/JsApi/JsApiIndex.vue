<template>
    <div id="jsApi">
        <NavHead v-if="showHead"></NavHead>
        <router-view></router-view>
    </div>
</template>

<script>
import NavHead from "@/components/common/navHead.vue";

export default {
    name: "JsApi",
    components: {
        NavHead
    },
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
