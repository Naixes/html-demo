<template lang="html">
  <div>
    <router-link :to="{ name: 'index', params: {} }">首页</router-link>
    <router-link :to="{ name: 'news', params: {} }">新闻</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {a: 12}
  },
  components: {
  }
}
</script>

<style lang="css" scoped>
</style>
