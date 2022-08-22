<template>
    <div id="comA">
        comA
        <ComB></ComB>
    </div>
</template>

<script>
export default {
    name:"ComA",

    // 异步声明
    components:{
        ComB: () => import('./ComB.vue')
    },

    // 或
    // beforeCreate(){
    //       this.$options.components.ComB = require('@/components/cookbook/recursionComponents/comB.vue').default
    // }
}
</script>