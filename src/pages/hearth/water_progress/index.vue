<template>
    <div id="waterProgress">
        <FixedScrollView :position="['0.8rem', 0, 0, 0]">
            <div class="state-ball">
                <div class="wave" :style="{ '--offset': progress }"></div>
            </div>
            <button @click="start" v-if="!isLoading">start</button>
            <button v-else @click="reset">reset</button>
        </FixedScrollView>
    </div>
</template>

<script>
import { gsap } from "gsap";
import FixedScrollView from "@/components/common/fixedScrollView.vue";

export default {
    name: "waterProgress",
    components: {
        FixedScrollView
    },
    data() {
        return {
            intervel: null,
            isLoading: false,
            progress: 0
        };
    },
    methods: {
        start() {
            this.progress = 0;
            this.isLoading = true;
            this.intervel = setInterval(() => {
                if (this.progress < 100) {
                    this.progress += 1;
                } else {
                    this.clearThisIntervel();
                }
            }, 300);
        },
        reset() {
            if (this.intervel) {
                this.clearThisIntervel();
            }

            this.start();
        },
        clearThisIntervel() {
            clearInterval(this.intervel);
            this.intervel = null;
            this.isLoading = false;
        }
    },
    beforeDestroy(){
        if (this.intervel) {
            this.clearThisIntervel();
        }
    }
};
</script>

<style lang="scss">
@keyframes rotate {
    to {
        transform: rotate(1turn);
    }
}

#waterProgress {
    .state-ball {
        overflow: hidden;
        position: relative;
        padding: 5px;
        border: 3px solid #3c9;
        border-radius: 100%;
        width: 150px;
        height: 150px;
        background-color: #fff;
        margin: 100px;

        .wave {
            position: relative;
            border-radius: 100%;
            width: 100%;
            height: 100%;
            background-image: linear-gradient(to bottom, #af8 13%, #3c9 91%);

            &::before,
            &::after {
                position: absolute;
                left: 50%;
                bottom: 5px;
                z-index: 9;
                margin-left: -100px;
                width: 200px;
                height: 200px;
                content: "";
                // transition: margin-bottom 1.5s;
            }
            &::before {
                margin-bottom: calc(var(--offset) * 1.34px);
                border-radius: 45%;
                background-color: rgba(#fff, 0.5);
                animation: rotate 10s linear -5s infinite;
            }
            &::after {
                margin-bottom: calc(var(--offset) * 1.34px + 10px);
                border-radius: 40%;
                background-color: rgba(#fff, 0.8);
                animation: rotate 15s infinite;
            }
        }
    }
}
</style>
