<template>
  <div>
    index page
    <button @click="toList">to list page</button>
  </div>
</template>

<script>
export default {
  methods:{
    toList(){
      this.$router.push({
        path: '/keepAliveRefresh/list'
      })
    }
  }
}
</script>