<!--
 * @Author: your name
 * @Date: 2021-03-18 21:15:55
 * @LastEditTime: 2021-03-18 21:41:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vuecookbook/src/components/cookbook/keepAlive/testComp.vue
-->
<template>
    <div>
        <button @click="changeNum">{{ num }}</button>
        <!-- <TestComp2/> -->
    </div>
</template>

<script>
import TestComp2 from './TestComp1.vue';

export default {
    name: "testComp",
    components:{
        TestComp2
    },
    data() {
        return {
            num: 0
        };
    },
    methods: {
        changeNum() {
            this.num += 1;
        }
    },
    beforeCreate() {
        console.log("----beforeCreate----");
    },
    created() {
        console.log("----created----");
    },
    beforeMount() {
        console.log("----beforeMount----");
    },
    mounted() {
        console.log("----mounted----");
    },
    beforeUpdate() {
        console.log("----beforeUpdate----");
    },
    updated() {
        console.log("----updated----");
    },
    beforeDestroy() {
        console.log("----beforeDestroy----");
    },
    destroyed() {
        console.log("----destroyed----");
    },
    activated() {
        console.log("**** activated ****");
    },
    deactivated() {
        console.log("**** deactivated ****");
    }
};
</script>
