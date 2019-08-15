<template>
    <div>
        <h4>组件通信--子级1:update</h4>
        <button @click="clickHandle">{{value}}</button>
        <!-- 继续传递给子组件 -->
        <GrandSon1 :value="value" @handle="handle"></GrandSon1>
    </div>
</template>

<script>
import GrandSon1 from './GrandSon1'
export default {
  components: {
    GrandSon1
  },
  props: {
    value: {
      type: Number
    }
  },
  methods: {
    clickHandle () {
      this.$emit('update:value', 500)
    },
    handle (data) {
      console.log('grandSon1 update', data)
    }
  }
}
</script>
