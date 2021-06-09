<template>
  <!-- <h1>reactive{{state.count}}</h1> -->
  <h1>reactive{{count}}</h1>
  <button @click="onClick">+1</button>
  <!-- template中不用.value -->
  <h1>ref{{refv}}</h1>
  <h1>comRefv{{comRefv}}</h1>
  <h1>props{{msg}}</h1>
</template>

<script setup lang="ts">
  import {reactive, computed, ref, defineProps, toRefs} from 'vue'

  defineProps({
    msg: String
  })

  const refv = ref(22)
  console.log(refv.value);
  // value属性是readonly的，不能直接修改，可以通过computed修改
  // reactive包装ref
  const state1 = {
    refv
  }
  // 如果computed依赖ref返回的还是ref
  // const comRefv = computed(() => refv.value + 1)
  // 写屏障，可以直接修改ref的value
  const comRefv = computed({
    get: () => refv.value + 1,
    set: v => refv.value
  })
  comRefv.value = Math.random()
  
  type DState = {
    count: number,
    double: number
  }
  const onClick = () => {
    state.count++
  }
  const state:DState = reactive({
    count: 0,
    double: computed(() => state.count * 2),
  })
  // 解构reactive
  const {count} = {...toRefs(state)}
</script>