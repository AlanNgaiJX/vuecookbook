<!--
 * @Author: your name
 * @Date: 2021-03-18 21:39:51
 * @LastEditTime: 2021-03-18 21:40:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Editt
 * @FilePath: /vuecookbook/src/components/cookbook/keepAliveTest/testComp1.vue
-->
<template>
  <div>
    hello
  </div>
</template>

<script>
export default {
  activated(){
    console.log("i am temp comp 2");
  }
}
</script>