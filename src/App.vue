<template>
  <Layout>
    <router-view></router-view>
  </Layout>
</template>
<script>
import Layout from "./layout/index.vue";
export default {
  components:{
    Layout
  }  
}
</script>
<style lang="scss">
html,body,#app{
  height: 100%;
}
</style>
