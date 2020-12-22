<template>
    <div id="serviceApi">
        <!-- <NavHead></NavHead> -->
        <router-view></router-view>
    </div>
</template>

<script>
import NavHead from "@/components/common/navHead.vue";

export default {
    name: "serviceApi",
    components:{
        NavHead
    }
};
</script>

<style lang="scss" scoped>
#serviceApi {
}
</style>
