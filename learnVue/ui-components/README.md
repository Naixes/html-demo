# ui-cascader

## 自定义指令v-click-outside

对dom的一系列操作可以绑定为一个指令

指令是方法有自己的生命周期：bind, inserted, update, componentUpdated, unbind

校验是否点击了元素的外部

指令的参数：el，bindings（绑定的内容，包括修饰符），vnode

将事件处理函数保存到el方便解除绑定

## flex布局级联实现结构

## 递归组件实现多层菜单

## 数组接收选择到的数据

level：记录当前层级

选择时将新数据提交并通知父级更改数据

lodash/cloneDeep cloneDeep()

## 数据的异步获取


## 发布

# form表单

## input

结构

```vue
<s-form :rules="rules" :model="model" ref="loginForm">
    <s-form-item label="用户名" prop="username">
        <s-input autocomplete="off" placeholder="输入用户名" v-model="model.username"></s-input>
    </s-form-item>
    <s-form-item label="密码" prop="password">
        <s-input autocomplete="off" placeholder="输入密码" type="password" v-model="model.password"></s-input>
    </s-form-item>
    <s-form-item>
        <button @click="submitForm">提交</button>
    </s-form-item>
</s-form>
```

### 数据绑定

自定义组件的事件绑定必须绑定value和input事件

>文档：
>
>[自定义组件的 `v-model`](https://cn.vuejs.org/v2/guide/components-custom-events.html#自定义组件的-v-model)
>
>一个组件上的 `v-model` 默认会利用名为 `value` 的 prop 和名为 `input` 的事件，但是像单选框、复选框等类型的输入控件可能会将 `value` attribute 用于[不同的目的](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#Value)。`model` 选项可以用来避免这样的冲突：
>
>```
>Vue.component('base-checkbox', {
>  model: {
>    prop: 'checked',
>    event: 'change'
>  },
>  props: {
>    checked: Boolean
>  },
>  template: `
>    <input
>      type="checkbox"
>      v-bind:checked="checked"
>      v-on:change="$emit('change', $event.target.checked)"
>    >
>  `
>})
>```
>
>现在在这个组件上使用 `v-model` 的时候：
>
>```
><base-checkbox v-model="lovingVue"></base-checkbox>
>```

```vue
<template>
    <div>
      <!-- 实现数据绑定 -->
      <input :value="value" @input="onInput" type="text">
    </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value);
      // 通知父组件做校验
      this.$parent.$emit('validate');
    },
  },
};
</script>

```

### 属性继承

```vue
<template>
    <div>
      <!-- 实现数据绑定 -->
      <!-- $attrs：包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)。 -->
      <input :value="value" @input="onInput" type="text" v-bind="$attrs">
    </div>
</template>

<script>
export default {
  // 继承属性
  // 默认情况下父作用域的不被认作 props 的特性绑定 (attribute bindings) 将会“回退”且作为普通的 HTML 特性应用在子组件的根元素上（即这里的div）。通过设置 inheritAttrs 到 false，这些默认行为将会被去掉。而通过实例属性 $attrs 可以让这些特性生效，且可以通过 v-bind 显性的绑定到非根元素上。
  inheritAttrs: false,
  ...
};
</script>

```

### 实现校验

input的父组件实现，input时触发

用到的包 *async-validator*

```vue
//form
<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
export default {
  provide() {
    return {
      // 将实例提供给子组件
      form: this,
    };
  },
  props: {
    // 校验内容  表单项：值
    model: {
      type: Object,
      required: true,
    },
    // 校验规则  表单项：[规则]
    rules: {
      type: Object,
    },
  },
  methods: {
    validate(cb) {
      // 获取所有校验结果的promise
      const tasts = this.$children.filter(item => item.prop).map(item => item.validate());
      // 所有校验通过才算通过
      Promise.all(tasts).then(() => { cb(true); }).catch(() => { cb(false); });
    },
  },
};
</script>

// form-item
<template>
    <div>
      <label v-if="label">{{label}}</label>
      <slot></slot>
      <p v-if="errMsg">{{errMsg}}</p>
    </div>
</template>

<script>
// 字段校验
import Schema from 'async-validator';

export default {
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: '',
    },
    prop: {
      type: String,
    },
  },
  data() {
    return {
      errMsg: '',
    };
  },
  mounted() {
    this.$on('validate', this.validate);
  },
  methods: {
    validate() {
      const value = this.form.model[this.prop];
      const rule = this.form.rules[this.prop];
      // npm i async-validator -S
      const schema = new Schema({ [this.prop]: rule });
      // 返回的是promise
      return schema.validate({ [this.prop]: value }, (err) => {
        if (err) {
          this.errMsg = err[0].message;
        } else {
          this.errMsg = '';
        }
      });
    },
  },
};
</script>
```

# notice

