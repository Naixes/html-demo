<template>
    <div>
        <h5>组件通信--子级的子级1</h5>
        <button @click="handle">GS1</button>
    </div>
</template>

<script>
export default {
  methods: {
    handle () {
      this.$dispatch('handle')
    }
  }
}
</script>
