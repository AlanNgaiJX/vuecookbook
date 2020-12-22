<template>
    <div id="jsApi">
        <NavHead></NavHead>
        <router-view></router-view>
    </div>
</template>

<script>
import NavHead from "@/components/common/navHead.vue";

export default {
    name: "JsApi",
    components:{
        NavHead
    }
};
</script>

<style lang="scss" scoped>
#jsApi {
}
</style>
