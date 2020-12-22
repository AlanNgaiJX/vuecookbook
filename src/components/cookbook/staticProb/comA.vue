<template>
    <input type="text" class="blueBg" />
</template>

<script>
export default {
    name: "comA",
    props: {
        type: String,
        testA: String
    },
    inheritAttrs: true,//false不自动继承所有的$attrs的属性到组件的根元素
    mounted() {
        console.log(this.type); //log-> number
        console.log(this.test); //log-> undefined 因为没有在prop中声明
        console.log(this.$attrs); //所有传入参数的集合,不包括class、style以及在prop中声明的参数
    }
};
</script>

<style lang="scss">
.blueBg {
    background-color: blue;
}

.redBorder {
    border: 1px solid red;
}
</style>
