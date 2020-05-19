<template>
  <div>
    <!-- aria-hidden="true"：为了避免屏幕识读设备抓取非故意的和可能产生混淆的输出内容 -->
    <svg :class="svgClass" aria-hidden="true">
      <use :xlink:href="iconName" />
    </svg>
  </div>
</template>

<script>

export default {
    name: 'SvgIcon',
    props: {
        name: {
            type: String,
            required: true
        },
        className: {
            type: String,
            default: ''
        }
    },
    computed: {
        svgClass() {
            return this.className ? `svg-icon ${this.className}` : 'svg-icon'
        },
        iconName() {
            return `#icon-${this.name}`
        }
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

