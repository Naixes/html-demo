<template>
<h1>sin</h1>
</template>

<script setup lang="ts">
  import {watchEffect, reactive, computed, ref, defineProps, toRefs, onMounted} from 'vue'
  const num = ref(0)
  // watchEffect不需要手动传入依赖
  // 不是lazy，初始化分析依赖
  // 无法获取原始值
  // 适合异步操作
  // 第一个参数处理副作用
  // onMounted之前调用
  // 返回函数可以停用监听

  onMounted(() => {
    console.log(num);
    
  })
  // 参数2调试参数
  const stop = watchEffect((onInvalidate) => {
    console.log(num.value);
    // 消除副作用
    onInvalidate(() =>{})
  }, {
    // watchEffect的调用时机
    // flush: 'sync',
    onTrigger(e) {
      // debugger
    }
  })
  setTimeout(() => {
    num.value++
  }, 1000)
  // 停用监听
  stop()
</script>