<template>
  <div>
    <!-- count:{{$store.getters.count}} -->
    count:{{this.count}}
    <VuexText :n=n></VuexText>
    <hr/>
    <VuexMapText :n=n></VuexMapText>
    <hr/>
    <router-link to='/animate/'>动画</router-link>
    <router-link to='/lifecircle/'>生命周期</router-link>
  </div>
</template>

<script>
import VuexText from '@/components/VuexTest'
import VuexMapText from '@/components/VuexMapText'
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
