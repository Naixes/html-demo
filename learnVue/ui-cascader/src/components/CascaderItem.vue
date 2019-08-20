<template>
    <div class="wrapper">
        <div class="cascader-left">
            <ul>
                <li v-for="(option, index) in options" :key="index" @click="select(option, level)">{{option.label}}</li>
            </ul>
        </div>
        <div class="cascader-right" v-if="childrenOptions && childrenOptions.length >0">
            <CascaderItem :options="childrenOptions" @change="change" :level="level+1" :value="value"></CascaderItem>
        </div>
    </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';

export default {
  name: 'CascaderItem',
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Array,
      default: () => [],
    },
    level: {
      type: Number,
      default: 1,
    },
    // 不能直接传会造成子组件一直存在，然后组件溢出，可以作为子元素计算出来
    // childrenOptions: {
    //     type: Array,
    //     default: () => []
    // }
  },
  computed: {
    childrenOptions() {
      console.log('options', this.options);
      if (this.value[this.level] && this.value[this.level].id) {
        const o = this.options.find(option => option.id === this.value[this.level].id);
        console.log('children', o.children);
        return o.children;
      }
      return [];
    },
  },
  data() {
    return {
    };
  },
  methods: {
    change(item) {
      this.$emit('change', item);
    },
    select(opt) {
      const cloneValue = cloneDeep(this.value);
      cloneValue[this.level] = opt;
      cloneValue.splice(this.level + 1);

      // 将处理好的value传给父级
      this.$emit('change', cloneValue);
    },
  },
};
</script>

<style lang="stylus">
.wrapper
    display flex;
    >div
        max-height 300px;
        overflow-y auto;
    ul
        border 1px solid #ccc;
        margin-top -1px;
    li
        min-width 50px;
        cursor pointer;
        &:hover
            background-color #eee;
    // li+li
    //     border-top 1px solid #ccc;
</style>
