<template>
  <div>
    hello world!{{item}}
    <p></p>
    <router-link to="/hello1">hello1 link</router-link>
  </div>
</template>

<script>
export default {
  // 在路由组件上暴露出一个自定义静态函数 asyncData。注意，由于此函数会在组件实例化之前调用，所以它无法访问 this。需要将 store 和路由信息作为参数传递进去
  asyncData: ({ store }) => {
    return store.dispatch('getDataAction')
  },
  computed: {
    item () {
      return this.$store.state.lists
    }
  }
}
</script>

<style lang="scss" scoped>
</style>