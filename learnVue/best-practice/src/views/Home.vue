<template>
  <div class="home">
    <!-- 直接使用svg -->
    <!-- aria-hidden="true"：为了避免屏幕识读设备抓取非故意的和可能产生混淆的输出内容 -->
    <svg class="svg-icon" aria-hidden="true">
      <use xlink:href="#icon-close" />
    </svg>
    <!-- 使用svg组件 -->
    <svg-icon name="close"/>
  </div>
</template>

<script>
// @ is an alias to /src
import SvgIcon from '@/components/SvgIcon.vue'

export default {
  name: 'Home',
  components: {
    SvgIcon
  }
}
</script>
<style scoped> 
.svg-icon {
  width: 1em; 
  height: 1em; 
  vertical-align: -0.15em; 
  fill: currentColor; 
  overflow: hidden; 
 } 
</style>

