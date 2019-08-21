<template>
  <div>
    <div class="profile">
      欢迎 {{this.$store.state.username}}
    </div>
    <Menu></Menu>
  </div>
</template>

<script>
export default {
  components: {
    Menu: () => import('./components/Menu'),
  },
};
</script>
