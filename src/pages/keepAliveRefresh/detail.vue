<template>
    <div>
        <div class="item" v-if="item">{{ item.id }}-{{ item.nickname }}-{{ item.age }}</div>
        <button @click="editAge">编辑</button>
        <button @click="back">返回</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            item: null
        };
    },
    methods: {
        editAge() {
            this.item.age = 999;
            this.$router.pushRefreshTask({
                path: "/keepAliveRefresh/list",
                id: this.item.id,
                listKey: 'list',
                assign: {
                    age: this.item.age
                }
            });
        },
        back() {
            this.$router.go(-1);
        }
    },
    mounted() {
        this.item = JSON.parse(this.$route.query.data);
        // this.$router.refreshQuee.push(1)
        // console.log(this.$router.refreshQuee);
    }
};
</script>
