<template>
    <div id="comB">
        comB
        <ComA v-if="Math.random()<0.9"></ComA>
    </div>
</template>

<script>
import ComA from "./ComA.vue";
export default {
    name:"ComB",
    components:{
        ComA: ComA
    }
}
</script>