<!-- 异步组件 -->
<template>
    <div id="AsyncComponents">
        <div class="viewContent">
            <h1>AsyncComponents</h1>
            <h2>异步组件:</h2>

            <button @click="A = !A">switchA</button>
            <button @click="B = !B">switchB</button>
            <button @click="C = !C">switchC</button>

            <ComA v-if="A"></ComA>
            <ComB v-if="B"></ComB>
            <ComC2 v-if="C" :smile="'hhhh'"></ComC2>

            <div class="conclude">
                <p>打开network > js查看，组件被分包异步加载</p>
                <img src="@/assets/image/asyncComponentsRes.png" alt="" />
            </div>
        </div>
    </div>
</template>

<script>
import Loading from "@/components/cookbook/asyncComponents/loading.vue";
import Error from "@/components/cookbook/asyncComponents/error.vue";

// 方式一，利用import返回一个promise
const ComA = () => import("@/components/cookbook/asyncComponents/comA.vue");

// 方式二，自己用require包装个promise
const ComB = function() {
    return new Promise((resolve, reject) => {
        require(["@/components/cookbook/asyncComponents/comB.vue"], resolve);
    });
};

const ComC = function() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            //模拟网络延迟, 尝试调整这里查看loading和error状态
            require(["@/components/cookbook/asyncComponents/comC.vue"], resolve);
        }, 1000);
    });
};

// 方式三：在以上基础上还可以设置延迟加载，超时，处理加载时状态等
const ComC2 = () => ({
    // 异步组件ComC，注意：这里需要的是一个promise而不是返回promise的工厂函数
    component: ComC(),
    // 加载时使用的组件
    loading: Loading,
    error: Error,

    // 展示加载时组件的延时时间。默认值 200
    delay: 0,

    // 超时，默认值：`Infinity`，超时后使用error: ErrorComponent
    timeout: 3000
});

export default {
    name: "AsyncComponents",
    components: {
        ComA,
        ComB,
        ComC2
    },
    data() {
        return {
            A: false,
            B: false,
            C: false
        };
    }
};
</script>

<style lang="scss" scoped>
#AsyncComponents {
    .viewContent {
        padding: 50px;

        .conclude {
            margin-top: 10px;
            font-size: 30px;

            img {
                width: 100%;
            }
        }
    }
}
</style>
