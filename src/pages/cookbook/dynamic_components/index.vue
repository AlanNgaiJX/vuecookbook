<!-- 动态组件 -->
<template>
    <div id="DynamicComponents">
        <div class="viewContent">
            <h1>DynamicComponents</h1>
            <h2>动态组件:</h2>

            <div class="example">
                <p>例一：无keepAlive，使用 'component' 标签，:is属性</p>
                <button @click="switchTab('TabA')">tabA</button>
                <button @click="switchTab('TabB')">tabB</button>
                <component :is="currTab"></component>
            </div>

            <div class="example">
                <p>例二：多使用了keepAlive</p>
                <button @click="switchTab2('TabA')">tabA</button>
                <button @click="switchTab2('TabB')">tabB</button>
                <keep-alive>
                    <component :is="currTab2"></component>
                </keep-alive>
            </div>
        </div>
    </div>
</template>

<script>
import TabA from "./TabA.vue";
import TabB from "./TabB.vue";

export default {
    name: "DynamicComponents",
    components: {
        TabA,
        TabB
    },
    data() {
        return {
            currTab: "TabA",
            currTab2: "TabA"
        };
    },
    methods: {
        switchTab(comName) {
            this.currTab = comName;
        },
        switchTab2(comName) {
            this.currTab2 = comName;
        }
    }
};
</script>

<style lang="scss">
#DynamicComponents {
    .viewContent {
        padding: 50px;

        .example {
            margin-top: 10px;
        }
    }
}
</style>
