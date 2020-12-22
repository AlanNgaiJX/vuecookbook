<template>
    <div id="webAudioApi">
        <FixedScrollView :position="['0.8rem', 0, 0, 0]">
            <TestWebAudio></TestWebAudio>
        </FixedScrollView>
    </div>
</template>

<script>
import FixedScrollView from "@/components/common/fixedScrollView.vue";
import TestWebAudio from "@/components/jsApi/testWebAudio.vue";
export default {
    name: "webAudioApi",
    components: {
        FixedScrollView,
        TestWebAudio
    }
};
</script>

<style lang="scss" scoped>
#webAudioApi {
}
</style>
