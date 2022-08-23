<template>
    <div id="webAudioApi">
        <TestWebAudio></TestWebAudio>
    </div>
</template>

<script>
import TestWebAudio from "./testWebAudio.vue";
export default {
    name: "webAudioApi",
    components: {
        TestWebAudio
    }
};
</script>

<style lang="scss" scoped>
#webAudioApi {
}
</style>