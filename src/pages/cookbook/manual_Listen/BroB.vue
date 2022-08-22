<template>
    <div>accept:{{ acceptData }}</div>
</template>

<script>
import bus from "./broBus.js";
export default {
    data() {
        return {
            acceptData: ""
        };
    },
    mounted() {
        bus.$on("speak", arg => {
            this.acceptData = arg;
        });
    }
};
</script>
