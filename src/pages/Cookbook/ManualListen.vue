<template>
    <div id="ManualListen">
        <div class="viewContent">
            <h1>ManualListen</h1>
            <h3>程序化的事件监听器<br />($on,$off,$once,$emit):</h3>

            <p>·v-on能监听 原生事件 和 自定义事件</p>
            <p>·$on只能监听自定义事件</p>

            <div class="exp">
                <h4 class="exp-title">1. 使用$on、$off，监听钩子函数</h4>
                <div class="exp-content">
                    <p>当离开页面时发出提示</p>
                    <button
                        class="btn-hintLeave"
                        v-text="willHintLeave ? 'on' : 'off'"
                        @click="changeHintLeave"
                    ></button>
                </div>
            </div>

            <div class="exp">
                <h4 class="exp-title">2. 使用$on、$emit父子组件通讯</h4>
                <div class="exp-content">
                    <div class="father">
                        father accept
                        <button
                            @click="changeListenChild"
                            v-text="willListenChild ? 'on' : 'off'"
                        ></button>
                        <p>{{ fatherAccept }}</p>
                        <div class="child">child<Send ref="send"></Send></div>
                    </div>
                </div>
            </div>

            <div class="exp">
                <h4 class="exp-title">3. 使用$on、$emit兄弟组件通讯</h4>
                <div class="exp-content">
                    <div class="bro"><BroA></BroA></div>
                    <div class="bro"><BroB></BroB></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Send from "@/components/cookbook/manualListen/send.vue";
import BroA from "@/components/cookbook/manualListen/broA.vue";
import BroB from "@/components/cookbook/manualListen/broB.vue";

export default {
    name: "ManualListen",
    components: {
        Send,
        BroA,
        BroB
    },
    data() {
        return {
            willHintLeave: false,
            willListenChild: false,
            fatherAccept: ""
        };
    },
    methods: {
        // ____________________例一_______________________

        changeHintLeave() {
            this.willHintLeave = !this.willHintLeave;
            this.checkWillHintLeave();
        },
        checkWillHintLeave() {
            if (this.willHintLeave) {
                this.$on("hook:beforeDestroy", this.hintLeave);
            } else {
                this.$off("hook:beforeDestroy", this.hintLeave);
            }
        },
        hintLeave() {
            alert("即将离开");
        },

        // ____________________例二_______________________

        changeListenChild() {
            this.willListenChild = !this.willListenChild;
            this.checkWillListenChild();
        },
        checkWillListenChild() {
            if (this.willListenChild) {
                this.$refs["send"].$on("speak", this.listenChild);
            } else {
                this.$refs["send"].$off("speak", this.listenChild);
            }
        },
        listenChild(arg) {
            this.fatherAccept = arg;
        }
    },
    mounted() {
        this.checkWillHintLeave();
        this.checkWillListenChild();

        this.$on("click", () => {
            alert("click");
        });
    }
};
</script>

<style lang="scss">
#ManualListen {
    .viewContent {
        padding: 50px;

        .exp {
            margin-top: 50px;

            .exp-title {
            }

            .exp-content {
                display: flex;

                .btn-hintLeave {
                    margin-left: 20px;
                }

                .father {
                    width: 250px;
                    height: 250px;
                    border: 1px dashed black;

                    .child {
                        width: 100px;
                        height: 100px;
                        border: 1px dashed black;
                    }
                }
            }

            .bro {
                width: 200px;
                height: 200px;
                border: 1px dashed black;
            }
        }
    }
}
</style>
