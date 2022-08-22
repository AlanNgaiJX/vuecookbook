<template>
    <div id="keep-alive">
        <button @click="changeShow">{{ show }}</button>

        <!-- <TestComp v-if="show" /> -->
        <keep-alive>
            <TestComp v-if="show"></TestComp>
        </keep-alive>
    </div>
</template>

<script>
import TestComp from "@/components/cookbook/keepAliveTest/testComp.vue";

export default {
    name: "KeepAliveTest",
    components: {
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
