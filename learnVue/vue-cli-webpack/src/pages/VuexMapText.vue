<template>
    <div>
        <p>a:{{this.a}}</p>
        <p>b:{{this.b}}</p>
        <p>modA_sta_a:{{this.sta_a}}</p>
        <p>modA_sta_b:{{this.sta_b}}</p>
        <p>modC_sta_a:{{this.stc_a}}</p>
        <p>modC_sta_b:{{this.stc_b}}</p>
        <button @click="setA(n)">a={{this.n}}</button>
        <button @click="setB(n)">b={{this.n}}</button>
        <br>
        <button @click="addA(n)">a+{{this.n}}</button>
        <button @click="addB(n)">b+{{this.n}}</button>
        <br>
        <button @click="modc_addA(n)">modC:a+{{this.n}}</button>
        <button @click="modc_addB(n)">modC:b+{{this.n}}</button>
    </div>
</template>

<script>
// mapState： 将state映射成computed
// mapActions： sctions -》 methods
// mapGetters： getters -》 computed
import {mapState, mapActions} from 'vuex'

export default {
  name: 'vuex-text',
  props: {
    n: {
      type: Number,
      default: 1
    }
  },
  created () {
    console.log('mapState', mapState(['a', 'b']))
  },
  computed: {
    // 将vuex的state映射到computed
    ...mapState(['a', 'b']),
    // 相当于
    // a () {
    //   return this.$store.state.a
    // },
    // b () {
    //   return this.$store.state.b
    // }

    // 利用对象起别名
    ...mapState({
      str_a (state) {
        // console.log(state)
        return state.a
      }
    }),
    // 简写
    ...mapState({
      str_a: state => state.a
    }),

    // 模块中的state
    // 不能这样写
    // ...mapState(['modA.sta_a'])
    ...mapState({
      // 相当于在主模块中增加了modA，每个模块都有自己的state不会重复
      sta_a: state => state.modA.sta_a,
      sta_b: state => state.modA.sta_b,
      stc_a: state => state.modC.sta_a,
      stc_b: state => state.modC.sta_b
    })
  },
  methods: {
    // 将vuex的actions映射到methods
    ...mapActions(['setA', 'setB']),
    // 相当于
    // setA (e, val) {
    //   this.$store.dispatch('setA', val)
    // },
    // setB (e, val) {
    //   this.$store.dispatch('setB', val)
    // }

    // 模块中的actions
    // 每个模块的actions不独立，需要时要利用方法名区分
    ...mapActions({
      modc_addA: 'modC.addA',
      modc_addB: 'modC.addB',
      // 会触发所有模块的addA
      addA: 'addA',
      addB: 'addB'
    })
  }
}
</script>

<style>

</style>
