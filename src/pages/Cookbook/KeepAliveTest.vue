<!--
 * @Author: your name
 * @Date: 2021-03-18 21:13:08
 * @LastEditTime: 2021-03-18 21:29:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vuecookbook/src/pages/Cookbook/KeepAlive.vue
-->
<template>
    <div id="keep-alive">
        <FixedScrollView :position="['0.8rem', 0, 0, 0]">
            <button @click="changeShow">{{ show }}</button>

            <!-- <TestComp v-if="show" /> -->

            <keep-alive>
                <TestComp v-if="show"></TestComp>
            </keep-alive>
        </FixedScrollView>
    </div>
</template>

<script>
import FixedScrollView from "@/components/common/fixedScrollView.vue";
import TestComp from "@/components/cookbook/keepAliveTest/testComp.vue";

export default {
    name: "KeepAliveTest",
    components: {
        FixedScrollView,
        TestComp
    },
    data() {
        return {
            show: false
        };
    },
    methods: {
        changeShow() {
            this.show = !this.show;
        }
    }
};
</script>
