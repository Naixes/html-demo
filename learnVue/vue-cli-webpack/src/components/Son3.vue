<template>
    <div>
        <h4>组件通信--子级3:ref</h4>
        <button>{{value}}</button>
        <slot></slot>
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
      name: 'son3'
    }
  },
  methods: {
  }
}
</script>
