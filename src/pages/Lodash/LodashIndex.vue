<template>
    <div id="lodash">
        <NavHead></NavHead>
        <router-view></router-view>
    </div>
</template>

<script>
import NavHead from "@/components/common/navHead.vue";

export default {
    name: "Lodash",
    components: {
        NavHead
    }
};
</script>

<style lang="scss" scoped>
#lodash {
}
</style>
