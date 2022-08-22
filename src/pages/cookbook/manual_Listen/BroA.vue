<template>
    <div>
        <button @click="send">send</button>
    </div>
</template>

<script>
import bus from "./broBus.js";
export default {
    methods:{
        send(){
            bus.$emit('speak',(Math.random()*100).toFixed(0));
        }
    }
}
</script>