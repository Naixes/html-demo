<template>
    <div>
      <li :fold="fold">
        {{model.value}}
        <span @click="toggle" v-if="model.children">[{{fold ? '-' : '+'}}]</span>
        <ul v-if="model.children && fold">
          <item v-for="mod in model.children" :model="mod" :key="mod.value"></item>
        </ul>
      </li>
    </div>
</template>

<script>

export default {
  name: 'item',
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
      fold: false,
    };
  },
  methods: {
    toggle() {
      this.fold = !this.fold;
    },
  },
};
</script>

<style scoped>
</style>
