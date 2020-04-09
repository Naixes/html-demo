<template>
    <div>
        <ul>
          <item :model="model"></item>
        </ul>
    </div>
</template>

<script>
import Item from './TreeItem.vue';

export default {
  components: {
    Item,
  },
  props: {
    model: {
      type: Object,
      default: () => ({}),
    },
  },
  created() {
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style scoped>
</style>
