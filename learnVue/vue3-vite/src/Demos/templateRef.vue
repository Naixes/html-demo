<template>
  <h1 ref="root">sin</h1>
</template>

<script setup lang="ts">
  import {reactive, computed, ref, defineProps, toRefs, onMounted} from 'vue'

  // templateRef
  const root = ref(null)
  onMounted(() => {
    console.log(root.value);
  }) 
</script>