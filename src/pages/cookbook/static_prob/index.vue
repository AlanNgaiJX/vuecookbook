<template>
    <div id="StaticProb">
        <div class="viewContent">
            <h1>StaticProb</h1>
            <h3>组件静态传参:</h3>
        </div>
        <div class="exp">
            <p>例一：`ComA class="redBorder" type="number" test="test"`</p>
            <ComA class="redBorder" type="number" testA="testA" testB="testB" testC="testC"></ComA>
        </div>
        <div class="conclude">
            <p>总结：</p>
            <br />
            <p>1.向组件传参不一定要用v-bind(动态prop)这样去传,也不一定要在prop中去声明。</p>
            <br />
            <p>2.prop只是提供数据校验，通过prop声明的参数才能被this.访问</p>
            <br />
            <p>
                3.在组件（ComA）上的属性会附着到组件的根节点上。
                <br />· type=number会覆盖input的type, class=redBorder则会合并到input的class中。
                <br />· 用inheritAttrs属性控制$attrs的继承。 <br />· this.$attr
                :所有传入参数的集合,不包括class、style以及在prop中声明的参数。
            </p>
            <br />
        </div>
    </div>
</template>

<script>
import ComA from "./ComA.vue";

export default {
    name: "StaticProb",
    components: {
        ComA
    }
};
</script>

<style lang="scss" scoped>
#StaticProb {
    .viewContent {
        padding: 50px;
    }
    .conclude {
        width: 650px;
        border: 1px solid blue;
        margin-top: 50px;
        padding: 20px;
    }
}
</style>
