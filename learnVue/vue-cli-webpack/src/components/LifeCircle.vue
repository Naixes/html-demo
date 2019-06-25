<template>
    <div class="lifecircle">
        {{msg}}
        <life-comp></life-comp>
        <router-link to='/lifecircle/comp'>to comp</router-link>
        <div @click="toComp">to comp</div>
    </div>
</template>

<script>
export default {
  components: {
    lifeComp: () => import('./lifeComp')
  },
  beforeRouteEnter (to, from, next) {
    console.log('beforeRouteEnter')
    // 不能访问this
    next(vm => {
      console.log(vm)
    })
  },
  // 在当前路由改变，但是该组件被复用时调用
  // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
  // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
  // 可以访问组件实例 `this`
  beforeRouteUpdate (to, from, next) {
    console.log('beforeRouteUpdate')
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('beforeRouteLeave')
    // 一般用于未保存时提示用户是否确认离开
    next()
    // 可以用来取消
    // next(false)
  },
  beforeCreate () {
    console.log('beforeCreate')
  },
  data () {
    console.log('data')
    return {
      msg: '我是可以驱动视图的数据'
    }
  },
  methods: {
    toComp () {
      // 在当前路由改变，但是该组件被复用时调用beforeRouteUpdate
      this.$router.replace({path: '/lifecircle', query: {t: '1'}})
    }
  },
  created () {
    console.log(this.msg)
    console.log('created')
  },
  beforeMount () {
    console.log('beforeMount')
  },
  // render() {
  //     console.log("render")
  // },
  mounted () {
    console.log('mounted')
    this.msg = 'change'
  },
  beforeUpdate () {
    console.log('beforeUpdate')
  },
  updated () {
    console.log('updated')
    // this.$destroy()
  },
  // 路由改变时
  beforeDestroy () {
    console.log('beforeDestroy')
  },
  destroyed () {
    console.log('destroyed')
  }
}
</script>

<style>

</style>
