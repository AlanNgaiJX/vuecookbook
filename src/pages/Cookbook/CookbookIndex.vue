<template>
    <div id="cookbook">
        <NavHead></NavHead>
        <router-view></router-view>
    </div>
</template>

<script>
import NavHead from "@/components/common/navHead.vue";

export default {
    name: "Cookbook",
    components:{
        NavHead
    }
};
</script>

<style lang="scss" scoped>
#cookbook {
}
</style>
