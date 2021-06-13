<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p @click="$store.commit('add')">🚆状态中的counter: {{$store.state.counter}}</p>
    <p @click="$store.dispatch('add')">🏮调用actions变化state: {{$store.state.counter}}</p>
    <p>⏰调用getters变化state: {{$store.getters.doubleCounter}}</p>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
};
</script>
