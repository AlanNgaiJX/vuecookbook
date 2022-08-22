<template>
    <div id="transition">
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
    </div>
</template>

<script>
export default {
    name: "trans",
    components: {},
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
        width: 450px;
        height: 450px;
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

    .myFade {
    }
}
</style>
