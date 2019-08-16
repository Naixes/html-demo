<template>
    <!-- 接收data和render函数，render函数可以改变渲染的标签 -->
    <div>
        <template v-for="(item, index) in data">
            <li :key="index" v-if="!render">{{item}}</li>
            <ListItem :key="`a${index}`" v-else :item="item" :renderList="renderList"></ListItem>
        </template>
    </div>
</template>

<script>
import ListItem from './ListItem'
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    renderList: {
      type: Function
    }
  },
  components: {
    ListItem
  }
}
</script>
