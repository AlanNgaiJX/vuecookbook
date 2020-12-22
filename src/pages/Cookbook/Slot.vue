<template>
    <div id="SlotPage">
        <FixedScrollView :position="['0.8rem', 0, 0, 0]">
            <div class="viewContent">
                <h1>Slot</h1>
                <h3>插槽：</h3>
            </div>
            <div class="exp">
                <ComA>
                    <template v-slot:head>
                        head
                    </template>

                    <template v-slot:body="bodySlotProps">
                        {{ bodySlotProps }}
                        <ComBody></ComBody>
                    </template>
                </ComA>
            </div>

            <div class="conclude">
                <p>总结：</p>
                <br />
                <p>1.插入具名插槽操作：<br>template v-slot:body="bodySlotProps <br>在template标签中插槽名为body,命名该插槽的所有props集合为bodySlotProps</p>
                <br />
                <p>2.创建一个具名插槽并向插槽传参：<br>slot name="body" :a="a" :b="b"</p>
            </div>
        </FixedScrollView>
    </div>
</template>

<script>
import FixedScrollView from "@/components/common/fixedScrollView.vue";
import ComA from "@/components/cookbook/slot/comA.vue";
import ComBody from "@/components/cookbook/slot/comBody.vue";

export default {
    name: "SlotPage",
    components: {
        FixedScrollView,
        ComA,
        ComBody
    }
};
</script>

<style lang="scss" scoped>
#SlotPage {
    .viewContent {
        padding: 0.5rem;
    }
    .exp {
        padding: 0.5rem;
        border: 1px dashed #333;
        margin-bottom: 0.8rem;
    }
    .conclude {
        width: 6.5rem;
        border: 1px solid blue;
        margin-top: 0.5rem;
        padding: 0.2rem;
    }
}
</style>
