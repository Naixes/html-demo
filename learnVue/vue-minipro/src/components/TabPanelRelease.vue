<template lang="html">
  <div class="ydc-tabPanel ydc-tabPanel-release">
      <div class="ydc-release-tab-head">
          <ul>
            <li v-for="tab,index in tabs" :class="index==cur?'hit':''" @click="cur=index">{{tab.title}}</li>
          </ul>
          <slot name="amount"/>
      </div>
      <div class="ydc-panes">
        <div v-for="tab,index in tabs" class="ydc-pane" :style="{display: index==cur?'block':'none'}">
          <slot :name="tab.slotname"/>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: ['tabs'],
  data(){
    return {
      cur: 0
    }
  }
}
</script>

<style lang="css" scoped>
</style>
