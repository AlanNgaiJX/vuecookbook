<!--
 * @Author: your name
 * @Date: 2021-03-18 23:15:30
 * @LastEditTime: 2021-03-18 23:28:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vuecookbook/src/components/cookbook/navGuard/navA.vue
-->
<template>
    <div>
        navA
    </div>
</template>

<script>
export default {
    name: "navA",
    beforeRouteEnter(to, from, next) {
        // ...
        console.log('**** beforeRouteEnter ****');
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
     beforeRouteLeave(to, from, next) {
        // ...
        console.log('**** beforeRouteLeave ****');
        next(vm => {
            console.log("#### beforeRouteLeave callback ####");
        });
    },
    beforeDestroy() {
        console.log("---- beforeDestroy ----");
    },
    destroyed() {
        console.log("---- destroyed ----");
    }
};
</script>
