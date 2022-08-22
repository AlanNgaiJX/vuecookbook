<template>
    <div>
        tabA<br />
        用以检验keep-alive的input: <input type="text" v-model="test" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            test: ""
        };
    },
    mounted() {
        console.log(" tabA mounted");
    },
    activated() {
        console.log(" tabA activated");
    },
    deactivated() {
        console.log(" tabA deactivated");
    },
    destroyed() {
        console.log(" tabA destroyed");
    }
};
</script>
