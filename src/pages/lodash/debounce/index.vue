<template>
    <div id="debounce">
        <p>debounce：<input type="text" @input="handleInput1" /></p>
        <p>throttle：<input type="text" @input="handleInput2" /></p>
    </div>
</template>

<script>
import debounce from "lodash-es/debounce.js";

export default {
    name: "debounce",
    components: {
    },
    methods: {
        handleInput1: debounce(
            function() {
                console.log("debounce input");
            },
            1000,
            {
                leading: true, //首次是否马上执行
                trailing: true //最后是否再执行一次 , debounce默认是true的不然就没得执行了,
            }
        ),

        handleInput2: debounce(
            function() {
                //loadash-es/throttle.js也是这样包装debouce成为throttle函数的
                console.log("throttle input");
            },
            1000,
            {
                leading: false,
                maxWait: 1000,
                trailing: true //throttle模式下可选为fasle
            }
        )
    }
};
</script>

<style lang="scss" scoped>
#debounce {
}
</style>
