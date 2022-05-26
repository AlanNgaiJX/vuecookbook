<template>
    <div id="scoped">
        <FixedScrollView :position="['0.8rem', 0, 0, 0]">
          <A />
        </FixedScrollView>
    </div>
</template>

<script>
import FixedScrollView from "@/components/common/fixedScrollView.vue";
import A from "@/components/hearth/A.vue";

export default {
  name: 'scoped',
  components: {
    FixedScrollView,
    A
  }
}
</script>

<style lang="scss">
#scoped {
  // .text{
  //   color: yellow;
  // }
}
.comp-a{
 .text{
    color: yellow;
  }
}

</style>