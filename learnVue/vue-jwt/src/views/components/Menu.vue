<template>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <template v-for="(item, index) in $store.state.menuList">
          <MenuItem :item="item" :key="index"></MenuItem>
      </template>
    </el-menu>
</template>

<script>
export default {
  components: {
    MenuItem: () => import('./MenuItem'),
  },
  methods: {
    handleOpen() {

    },
    handleClose() {

    },
  },
};
</script>
