<template>
<h1>sin</h1>
<h2>{{state.count}}</h2>
</template>

<script setup lang="ts">
  import {watch, reactive, computed, ref, defineProps, toRefs} from 'vue'
  const state = reactive({
    count: 0
  })
  // 可以监听多个值，只支持ref
  // 数据源：值/函数，回调，options
  // 默认lazy模式，改变时才会执行，刚开始不执行
  watch(() => state.count, (count, precount) => {
    console.log('watch', count);
  }, {
    // 是否立即执行
    immediate: true,
    deep: true
  })
  setTimeout(() => {
    state.count++
  }, 1000)
</script>