<template>
    <div>accept:{{ acceptData }}</div>
</template>

<script>
import bus from "@/components/cookbook/manualListen/broBus.js";
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
