<!-- 动态组件 -->
<template>
    <div id="DynamicComponents">
        <FixedScrollView :position="['0.8rem', 0, 0, 0]">
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
        </FixedScrollView>
    </div>
</template>

<script>
import FixedScrollView from "@/components/common/fixedScrollView.vue";
import TabA from "@/components/cookbook/dynamicComponents/tabA.vue";
import TabB from "@/components/cookbook/dynamicComponents/tabB.vue";

export default {
    name: "DynamicComponents",
    components: {
        FixedScrollView,
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

<style lang="scss" scoped>
#DynamicComponents {
    .viewContent {
        padding: 0.5rem;

        .example {
            margin-top: 1rem;
        }
    }
}
</style>
