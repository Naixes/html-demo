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
