<template>
    <div>
        <h4>组件通信--子级2:v-model</h4>
        <button @click="clickHandle">{{value}}</button>
    </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number
    }
  },
  data () {
    return {
      name: 'son2'
    }
  },
  methods: {
    clickHandle () {
      console.log(this.$listeners)
      this.$emit('input', 200)
    }
  }
}
</script>
