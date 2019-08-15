<template>
    <div>
        <h5>组件通信--子级的子级2</h5>
        <button @click="$parent.$emit('input', 1000)">{{value}}</button>
    </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number
    }
  },
  methods: {
  }
}
</script>
