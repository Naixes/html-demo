<template>
    <div class="cascader" v-click-outside="hideOptions">
        <div class="select" @click="toggleOptions" :title="result">
            {{result}}
        </div>
        <CascaderItem v-if="fShowOptions" :options="options" :value="value" @change="change" :level="0"></CascaderItem>
    </div>
</template>

<script>
// 指令：判断是否点击了dom元素以外的部分
import cloneDeep from 'lodash/cloneDeep';
import { clickOutside } from '../../directions/clickOutside';

export default {
  components: {
    CascaderItem: () => import('./CascaderItem'),
  },
  directives: {
    clickOutside,
  },
  computed: {
    // 当前选中的完整内容
    result() {
      const arr = [];
      this.value.forEach((opt) => {
        arr.push(opt.label);
      });
      return arr.join('/');
    },
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Array,
      default: () => [],
    },
    lazyload: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      // f开头表示flag
      fShowOptions: false,
    };
  },
  methods: {
    // 当前选中的完整值
    change(val) {
      // 更新value值
      this.$emit('input', val);

      // 获取当前选项并添加子元素
      const lastItem = val[val.length - 1];
      this.lazyload(lastItem.id, (children) => {
      // 如果没有子元素，关闭下拉
        if (!children || !children.length) {
          this.hideOptions();
          return;
        }
        const cloneOptions = cloneDeep(this.options);

        // 用来做广度遍历
        let stack = [...cloneOptions];
        let current;
        let index = 0;

        // 广度遍历
        // eslint-disable-next-line
        while (current = stack[index++]) {
          if (current.id !== lastItem.id) {
            if (current.children) {
              // stack重新赋值
              stack = stack.concat(current.children);
            }
          } else {
            // 找到时退出
            break;
          }
        }
        // 给当前选择项添加子元素
        if (current) {
          // 给value添加子元素
          current.children = children;
          this.$emit('update:options', cloneOptions);
        }
      });
    },
    toggleOptions() {
      this.fShowOptions = !this.fShowOptions;
    },
    hideOptions() {
      this.fShowOptions = false;
    },
  },
};
</script>

<style lang="stylus">
ul
    margin 0;
    padding 0;
    list-style none;
li
    padding 4px 6px;
.cascader
    display inline-block;
    .select
        overflow hidden;
        text-overflow ellipsis;
        white-space nowrap;

        width 150px;
        height 30px;
        border 1px solid #aaa;
        cursor pointer;
</style>
