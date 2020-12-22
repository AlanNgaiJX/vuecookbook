<template>
    <div id="transition">
        <FixedScrollView :position="['0.8rem', 0, 0, 0]">
            <button @click="a = !a">switichA</button>
            <button @click="b = !b">switichB</button>
            <button @click="c = !c">switichC</button>

            <div>
                <transition name="myFade">
                    <div class="rect a" v-show="a">A</div>
                </transition>

                <div class="rect b" v-show="b">B</div>

                <div class="rect c" v-show="c">C</div>
            </div>
        </FixedScrollView>
    </div>
</template>

<script>
import FixedScrollView from "@/components/common/fixedScrollView.vue";

export default {
    name: "trans",
    components: {
        FixedScrollView
    },
    data() {
        return {
            a: false,
            b: false,
            c: false
        };
    }
};
</script>

<style lang="scss">
#transition {
    .rect {
        width: 4.5rem;
        height: 4.5rem;
        display: flex;
        justify-content: center;
        align-items: center;

        &.a {
            background-color: plum;
        }

        &.b {
            background-color: blue;
        }

        &.c {
            background-color: brown;
        }
    }

    .myFade{
        
    }
}
</style>
