<!--  -->
<template>
  <div>
    <h1>About</h1>
    <h2>{{userInfo.name}}</h2>
  </div>
</template>

<script>
import {useStore} from 'vuex'
export default {
  name: 'About',
  setup() {
    const {getters} = useStore()
    const userInfo = getters["demo/getData"]
    console.log('getters', getters);
    return {
      userInfo
    }
  }
}

</script>