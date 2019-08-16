<template>
    <div>
        <!-- 直接使用函数式组件 -->
        <div>
            <Level :l="1">标题</Level>
            <Level :l="2">标题</Level>
            <Level :l="3">标题</Level>
        </div>

        <!-- 通过传递renderList函数：elementui的tree -->
        <!-- 注意不能取名为render否则传不过去 -->
        <List :data="['香蕉','苹果','橘子']" :renderList="renderList"></List>

        <!-- 通过作用域插槽实现 -->
        <ListSlot :data="['香蕉','苹果','橘子']">
            <!-- v-slot获取默认插槽的参数对象 -->
            <!-- v-slot:xxx 获取xx插槽的参数对象 -->
            <template v-slot:fruit="{item, a}">
                <span>{{item}}|</span>
            </template>
        </ListSlot>
    </div>
</template>

<script>
import List from './components/List'
export default {
  components: {
    Level: () => import('./components/levelFunction'),
    List,
    ListSlot: () => import('./components/ListSlot')
  },
  methods: {
    renderList (h, data) {
      return <h5>{data}</h5>
    }
  }
}
</script>
