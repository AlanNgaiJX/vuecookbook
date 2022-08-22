<template>
    <div>
        <button @click="send">send</button>
    </div>
</template>

<script>
export default {
    name:"send",
    methods:{
        send(){
            this.$emit('speak',(Math.random()*100).toFixed(0));
        }
    }
}
</script>