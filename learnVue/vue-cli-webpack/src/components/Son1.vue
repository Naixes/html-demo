<template>
    <div>
        <h4>组件通信--子级1:update</h4>
        <button @click="clickHandle">{{value}}</button>
        <GrandSon1></GrandSon1>
        <GrandSon2></GrandSon2>
    </div>
</template>

<script>
import GrandSon1 from './GrandSon1'
import GrandSon2 from './GrandSon2'
export default {
  components: {
    GrandSon1, GrandSon2
  },
  props: {
    value: {
      type: Number
    }
  },
  methods: {
    clickHandle () {
      console.log(this.$listeners)
      this.$emit('update:value', 200)
    },
    handle () {
      console.log('update')
    }
  }
}
</script>
