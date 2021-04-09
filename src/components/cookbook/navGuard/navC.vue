<!--
 * @Author: your name
 * @Date: 2021-03-18 23:15:30
 * @LastEditTime: 2021-03-18 23:18:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vuecookbook/src/components/cookbook/navGuard/navC.vue
-->
<template>
    <div>
        navC
    </div>
</template>

<script>
export default {
    name: "navC",
    beforeRouteEnter(to, from, next) {
        // ...
        next(vm => {
            console.log("#### beforeRouteEnter callback ####");
        });
    },
    beforeCreate() {
        console.log("---- beforeCreate ----");
    },
    created() {
        console.log("---- created ----");
    },
    beforeMount() {
        console.log("---- beforeMount ----");
    },
    mounted() {
        console.log("---- mounted ----");
    },
    activated() {
        console.log("---- activated ----");
    },
    deactivated() {
        console.log("---- deactivated ----");
    },
    beforeDestroy() {
        console.log("---- beforeDestroy ----");
    },
    destroyed() {
        console.log("---- destroyed ----");
    }
};
</script>
