<template>
    <div id="scoped">
        <A />
    </div>
</template>

<script>
import A from "./A.vue";

export default {
    name: "scoped",
    components: {
        A
    }
};
</script>

<style lang="scss">
#scoped {
    // .text{
    //   color: yellow;
    // }
}
.comp-a {
    .text {
        color: yellow;
    }
}
</style>
