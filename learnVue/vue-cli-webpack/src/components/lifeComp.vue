<template>
    <div class="compLifecircle">{{msg}}</div>
</template>

<script>
export default {
  // 组件内路由守卫
  beforeRouteEnter (to, from, next) {
    console.log('comp beforeRouteEnter')
    next(vm => {
      console.log(vm)
    })
  },
  beforeRouteUpdate (to, from, next) {
    console.log('comp beforeRouteUpdate')
  },
  beforeCreate () {
    console.log('comp beforeCreate')
  },
  data () {
    console.log('comp data')
    return {
      msg: ' : this is comp msg'
    }
  },
  created () {
    console.log(this.msg)
    console.log('comp created')
  },
  beforeMount () {
    console.log('comp beforeMount')
  },
  // render() {
  //     console.log("render")
  // },
  mounted () {
    console.log('comp mounted')
    this.msg = 'comp change'
  },
  beforeUpdate () {
    console.log('comp beforeUpdate')
  },
  updated () {
    console.log('comp updated')
    // this.$destroy()
  },
  beforeDestroy () {
    console.log('comp beforeDestroy')
  },
  destroyed () {
    console.log('comp destroyed')
  }
}
</script>

<style>

</style>
