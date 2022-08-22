<template>
    <div id="comC">
        C {{smile}}
    </div>
</template>

<script>
export default {
    props:{
        smile:{
            type: String
        }
    }
}
</script>

<style lang="scss">
#comC{
    width: 1rem;
    height: 1rem;
    background-color: yellow;
}   
</style>