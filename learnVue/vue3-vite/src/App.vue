<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div>
    <!-- 异步组件 -->
    <Suspense>
      <template #default>
        <HelloWorld msg="Hello Vue 3 + Vite + TypeScript" />
      </template>
      <template #fallback>
        <div>loading...</div>
      </template>
    </Suspense>
  </div>
</template>

<!-- setup的两种写法，当前是新的 -->
<script setup lang="ts">
// 组件引入自动挂载，注意eslint问题，未使用
import HelloWorld from '@/components/HelloWorld.vue'

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
