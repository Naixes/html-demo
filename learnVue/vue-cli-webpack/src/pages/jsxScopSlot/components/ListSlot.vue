<template>
    <div>
        <template v-for="(item, index) in data">
            <!-- name是插槽的名字，可以不写 -->
            <slot name='fruit' :item="item" :index="index"></slot>
        </template>
    </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  }
}
</script>
