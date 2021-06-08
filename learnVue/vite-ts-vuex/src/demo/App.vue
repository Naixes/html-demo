
// 写上setup，内部代码就是之前setup里的代码
// <script setup lang="ts">
  // import { defineProps, reactive } from 'vue'

  // // 自动注入
  // import HelloWorld from './components/HelloWorld.vue'

  // defineProps({
  //   msg: String
  // })
// </script>

// 早期写法
<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  }
})
</script>