<template>
    <div>
        <h2>组件通信--父级</h2>
        <h3>子组件改变父组件</h3>
        <button @click="$broadcast('handle', 222)">{{money}}</button>
        <!-- 通过绑定updat，调用方法：this.$emit('update:value', val) -->
        <Son1 :value="money" @update:value="updateHandle" @handle="handle"></Son1>
        <!-- 语法糖方式 -->
        <!-- <Son1 :value.sync="money"></Son1> -->
        <!-- 通过绑定v-model -->
        <Son2 v-model="money"></Son2>
        <!-- 通过绑定ref -->
        <Son3 v-model="money" ref="son3"></Son3>
        <button @click="clickHandle">{{name}}:{{money}}</button>
    </div>
</template>

<script>
import Son1 from '../components/Son1'
import Son2 from '../components/Son2'
import Son3 from '../components/Son3'

export default {
  components: {
    Son1, Son2, Son3
  },
  data () {
    return {
      money: 100,
      name: 'fa'
    }
  },
  methods: {
    updateHandle (val) {
      // console.log(val)
      this.money = val
    },
    clickHandle () {
      this.name = this.$refs.son3.name
      this.$refs.son3.$emit('input', 300)
    },
    handle (data) {
      console.log('son1 update', data)
    }
  }
}
</script>
