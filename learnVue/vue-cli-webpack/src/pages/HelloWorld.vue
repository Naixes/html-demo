<template>
  <div>
    <!-- count:{{$store.getters.count}} -->
    count:{{this.count}}
    <VuexText :n=n></VuexText>
    <hr/>
    <VuexMapText :n=n></VuexMapText>
    <hr/>
    <router-link to='/animate/'>动画 | </router-link>
    <router-link to='/lifecircle/'>生命周期 | </router-link>
    <router-link to='/comps/'>组件通信 | </router-link>
    <router-link to='/jsxScopSlot/'>jsx&scopSlot | </router-link>
  </div>
</template>

<script>
import VuexText from '@/pages/VuexTest'
import VuexMapText from '@/pages/VuexMapText'
import {mapGetters} from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      n: 5
    }
  },
  computed: {
    ...mapGetters(['count'])
  },
  components: {
    VuexText, VuexMapText
  }
}
</script>

<style>

</style>
