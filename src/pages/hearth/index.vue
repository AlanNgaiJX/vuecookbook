<template>
    <div id="hearth">
        <!-- <NavHead></NavHead> -->
        <router-view></router-view>
    </div>
</template>

<script>
import NavHead from "@/components/common/navHead.vue";

export default {
    name: "Hearth",
    components:{
        NavHead
    }
};
</script>

<style lang="scss" scoped>
#hearth {
}
</style>
