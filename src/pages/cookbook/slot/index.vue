<template>
    <div id="SlotPage">
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
            <p>
                1.插入具名插槽操作：<br />template v-slot:body="bodySlotProps
                <br />在template标签中插槽名为body,命名该插槽的所有props集合为bodySlotProps
            </p>
            <br />
            <p>2.创建一个具名插槽并向插槽传参：<br />slot name="body" :a="a" :b="b"</p>
        </div>
    </div>
</template>

<script>
import ComA from "./ComA.vue";
import ComBody from "./ComBody.vue";

export default {
    name: "SlotPage",
    components: {
        ComA,
        ComBody
    }
};
</script>

<style lang="scss" scoped>
#SlotPage {
    .viewContent {
        padding: 50px;
    }
    .exp {
        padding: 50px;
        border: 1px dashed #333;
        margin-bottom: 80px;
    }
    .conclude {
        width: 650px;
        border: 1px solid blue;
        margin-top: 50px;
        padding: 20px;
    }
}
</style>
