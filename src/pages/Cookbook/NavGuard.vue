<!--
 * @Author: your name
 * @Date: 2021-03-18 23:10:53
 * @LastEditTime: 2021-03-19 20:51:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vuecookbook/src/pages/Cookbook/NavGuard.vue
-->
<template>
    <div id="nav-guard">
        <button @click="routeTo('/cookbook/navGuard/a')">a</button>
        <button @click="routeTo('/cookbook/navGuard/b')">b</button>
        <button @click="routeTo('/cookbook/navGuard/c')">c</button>
        <button @click="open">open new</button>
        <button @click="test">test</button>
        <button @click="replaceTo('/cookbook/navGuard/b')">replace to b</button>
        <button @click="replaceTo('/cookbook/navGuard/c')">replace to c</button>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script>
export default {
    name: "nav-guard",
    data() {
        return {
            arr: [1, 2, 3, 4]
        };
    },
    computed: {
        t() {
            return num => {
                return this.arr[num];
            };
        }
    },
    methods: {
        routeTo(path) {
            this.$router.push({ path });
        },
        replaceTo(path) {
            this.$router.replace({ path });
        },
        open() {
            const { href } = this.$router.resolve({
                path: "/cookbook/cookbookList"
            });
            // '#/cookbook/cookbookList'
            window.open(href, "blank");
            // 此时会弹出一个新的窗口，并加载到 index.html#/cookbook/cookbookList 路由下
        },
        test() {
            console.log(this.t(2));
        }
    }
};
</script>

<style lang="scss">
#nav-guard {
    padding-top: 2rem;
}
</style>
