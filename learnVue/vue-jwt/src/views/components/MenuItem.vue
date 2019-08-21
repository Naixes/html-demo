<template>
    <el-submenu v-if="item.children.length" :index="item.auth">
        <template slot="title">{{item.name}}</template>
        <template v-for="(m,i) in item.children">
            <MenuItem :key="i" :item="m"></MenuItem>
        </template>
    </el-submenu>
    <el-menu-item :index="item.auth" v-else>
        <router-link :to="{name:item.auth}">{{item.name}}</router-link>
    </el-menu-item>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
