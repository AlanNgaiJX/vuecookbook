<template>
    <div id="Algorithm">
        <NavHead></NavHead>
        <router-view></router-view>
    </div>
</template>

<script>
import NavHead from "@/components/common/navHead.vue";

export default {
    name: "Algorithm",
    components:{
        NavHead
    }
};
</script>

<style lang="scss" scoped>
#Algorithm {
}
</style>
