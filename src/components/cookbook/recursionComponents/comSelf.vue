<template>
    <div id="comSelf">
        comSelf
        <comSelf v-if="Math.random()<0.9"></comSelf>
    </div>
</template>

<script>
export default {
    name:"comSelf"
}
</script>

<style lang="scss">
#comSelf,.inline{
    display: inline-block;
}    
</style>