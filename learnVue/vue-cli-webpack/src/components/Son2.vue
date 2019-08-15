<template>
    <div>
        <h4>组件通信--子级2:v-model</h4>
        <button @click="clickHandle">{{value}}</button>
        <!-- 继续传递给子组件 -->
        <GrandSon2 :value="value"></GrandSon2>
    </div>
</template>

<script>
import GrandSon2 from './GrandSon2'
export default {
  components: {
    GrandSon2
  },
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
