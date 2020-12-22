<template>
    <div id="examNextTick">
        <FixedScrollView :position="['0.8rem', 0, 0, 0]">
            <button @click="reset">reset</button>
            <button @click="initWithNextTick">initWithNextTick</button>
            <button @click="initWithSetTimeout">initWithSetTimeout</button>
            <button @click="testDemo">testDemo</button>

            <div class="redRect" v-if="showRed">I am red</div>

            <div class="listOfBlue" v-if="showBlueList">
                <div class="blueRect" v-for="(item, index) in 999999" :key="index"></div>
            </div>
        </FixedScrollView>
    </div>
</template>

<script>
import FixedScrollView from "@/components/common/fixedScrollView.vue";
export default {
    name: "examNextTick",
    components: {
        FixedScrollView
    },
    data() {
        return {
            showBlueList: false,
            showRed: false
        };
    },
    methods: {
        reset() {
            this.showRed = false;
            this.showBlueList = false;
        },
        initWithNextTick() {
            this.showRed = true;

            this.$nextTick(() => {
                console.log("start");
                this.showBlueList = true;
            });
        },
        initWithSetTimeout() {
            this.showRed = true;

            setTimeout(() => {
                console.log("start");
                this.showBlueList = true;
            }, 0);
        },
        testDemo() {
            console.log(1);

            setTimeout(() => {
                // macroTask
                console.log(4);

                setTimeout(() => {
                    // macroTask
                    console.log(8);
                }, 0);

                this.$nextTick(() => {
                    // microTask
                    console.log(5);
                });

                Promise.resolve().then(function() {
                    // microTask
                    console.log(7);
                });

                this.$nextTick(() => {
                    // microTask
                    console.log(6);
                });
            }, 0);

            this.$nextTick(() => {
                // microTask
                console.log(3);
            });

            console.log(2);
        }
    }
};
</script>

<style lang="scss" scoped>
#examNextTick {
    .redRect {
        width: 1rem;
        height: 1rem;
        background-color: red;
    }

    .blueRect {
        width: 1rem;
        height: 1rem;
        background-color: blue;
    }
}
</style>
