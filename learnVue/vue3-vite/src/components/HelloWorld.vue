<template>
  <h1>sin</h1>
</template>

<script setup lang="ts">
  import {onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onUnmounted, onErrorCaptured, watch, watchEffect, reactive, computed, ref, defineProps, toRefs} from 'vue'

  import useProducts from '@/models/products'

  const {products} = await useProducts()
</script>