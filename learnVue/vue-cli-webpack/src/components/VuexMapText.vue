<template>
    <div>
        <p>a:{{this.a}}</p>
        <p>b:{{this.b}}</p>
        <button @click="setA(n)">a={{this.n}}</button>
        <button @click="setB(n)">b={{this.n}}</button>
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
    ...mapState(['a', 'b'])
    // 相当于
    // a () {
    //   return this.$store.state.a
    // },
    // b () {
    //   return this.$store.state.b
    // }
  },
  methods: {
    // 将vuex的actions映射到methods
    ...mapActions(['setA', 'setB'])
    // 相当于
    // setA (e, val) {
    //   this.$store.dispatch('setA', val)
    // },
    // setB (e, val) {
    //   this.$store.dispatch('setB', val)
    // }
  }
}
</script>

<style>

</style>
