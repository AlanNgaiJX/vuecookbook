<template>
    <div>
        list page
        <div class="list">
            <div class="item" v-for="item in list" :key="item.id">
                <div class="content">{{ item.id }}-{{ item.nickname }}-{{ item.age }}</div>
                <button @click="toDetail(item)">详情</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pageInited: false,
            list: []
        };
    },
    methods: {
        initPage() {
            console.log("init");
            this.list = [
                { id: 1, nickname: "alex", age: 28 },
                {
                    id: 2,
                    nickname: "alan",
                    age: 25
                },
                { id: 3, nickname: "alice", age: 26 }
            ];
            this.pageInited = true;
        },
        toDetail(item) {
            this.$router.push({
                path: "/keepAliveRefresh/detail",
                query: {
                    data: JSON.stringify(item)
                }
            });
        }
    },
    activated() {
        if (!this.pageInited) {
            this.initPage();
        } else {
            this.$router.execRefreshQueue(this);
        }
    },
    beforeRouteLeave(to, from, next) {
        if (to.path === "/keepAliveRefresh/index") {
            this.$router.destroyKeepAlivePage(this);
        }
        next();
    }
};
</script>

<style lang="scss">
.item {
    display: flex;
}
</style>
