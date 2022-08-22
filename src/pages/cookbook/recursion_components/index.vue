<template>
    <div id="RecursionComponents">
        <div class="viewContent">
            <h1>RecursionComponents</h1>
            <h3>递归组件：</h3>
        </div>
        <div class="exp">
            <p>
                例一： 自递归,
                通过'name'来调用自身,必须保证递归是个可能为false的条件渲染，否则将报错RangeError:
                Maximum call stack size exceeded
            </p>
            <br />
            <comSelf></comSelf>
        </div>

        <div class="exp">
            <p>
                例二：
                互相引用递归,同样必须保证递归是个有限的递归，其次是为了解决互相引用的悖论，需要异步声明首组件(在beforeCreate钩子中或使用import=>())
            </p>
            <br />
            <ComA></ComA>
        </div>
    </div>
</template>

<script>
import ComA from "./ComA.vue";
import comSelf from "./ComSelf.vue";

export default {
    name: "RecursionComponents",
    components: {
        ComA,
        comSelf
    }
};
</script>

<style lang="scss" scoped>
#RecursionComponents {
    .viewContent {
        padding: 50px;
    }

    .exp {
        padding: 50px;
        border: 1px dashed #333;
        margin-bottom: 80px;
    }
}
</style>
