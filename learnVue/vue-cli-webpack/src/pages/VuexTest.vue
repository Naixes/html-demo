<template>
    <div>
        <p>a:{{this.$store.state.a}}</p>
        <p>b:{{this.$store.state.b}}</p>
        <button @click="$store.dispatch('addA', n)">a+{{this.n}}</button>
        <button @click="$store.dispatch('addB', n)">b+{{this.n}}</button>
    </div>
</template>

<script>
export default {
  name: 'vuex-text',
  props: {
    n: {
      type: Number,
      default: 1
    }
  },
  methods: {
    // addA () {
    //   this.$store.dispatch('addA', this.n)
    // }
  }
}
</script>

<style>

</style>
