<template>
    <div id="RecursionComponents">
        <FixedScrollView :position="['0.8rem', 0, 0, 0]">
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
                <br>
                <comSelf></comSelf>
            </div>

            <div class="exp">
                <p>例二： 互相引用递归,同样必须保证递归是个有限的递归，其次是为了解决互相引用的悖论，需要异步声明首组件(在beforeCreate钩子中或使用import=>())</p>
                <br>
                <ComA></ComA>
            </div>
        </FixedScrollView>
    </div>
</template>

<script>
import FixedScrollView from "@/components/common/fixedScrollView.vue";
import ComA from "@/components/cookbook/recursionComponents/comA.vue";
import comSelf from "@/components/cookbook/recursionComponents/comSelf.vue";

export default {
    name: "RecursionComponents",
    components: {
        FixedScrollView,
        ComA,
        comSelf
    }
};
</script>

<style lang="scss" scoped>
#RecursionComponents {
    .viewContent {
        padding: 0.5rem;
    }

    .exp {
        padding: 0.5rem;
        border: 1px dashed #333;
        margin-bottom: .8rem;
    }
}
</style>
