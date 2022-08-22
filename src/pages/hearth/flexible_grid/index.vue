<template>
    <div>
        <div class="grid-wrap">
            <div v-for="item in 9" :key="item" :class="'color-' + item">{{ item }}</div>
        </div>
    </div>
</template>

<style lang="scss">
$color-list: (
    1: red,
    2: green,
    3: blue,
    4: aqua,
    5: yellow,
    6: burlywood,
    7: crimson,
    8: darkcyan,
    9: darkmagenta
);

.grid-wrap {
    display: grid;
    width: 100%;
    background-color: pink;
    grid-template-columns: repeat(auto-fit, 200px);
    // grid-template-rows: 100px 100px 100px;
}

@each $type, $color in $color-list {
    #{".color-" + $type} {
        background-color: #{$color};
        height: 50px;
    }
}
</style>
