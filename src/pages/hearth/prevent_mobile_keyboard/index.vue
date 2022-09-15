<template>
    <div class="prevent_mobile_keyboard">
        <p>请在手机上查看</p>
        <!-- 方案一：使用Readonly -->
        <input type="text" readonly placeholder="请输入" />

        <!-- 方案二：使用blur -->
        <input type="text" @focus="preventKeyboard" placeholder="请输入" />
    </div>
</template>

<script>
export default {
    name: "prevent_mobile_keyboard",
    methods: {
        preventKeyboard() {
            document.activeElement.blur();
        }
    }
};
</script>
