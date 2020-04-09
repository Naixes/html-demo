<template>
  <div id="app">
    <!-- 树 -->
    <s-tree :model="treeOpt"></s-tree>
    <!-- 级联 -->
    <cascader :options.sync="options" v-model="value" :lazyload="lazyload"></cascader>
    <!-- 表单 -->
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
  </div>
</template>

<script>
// 树
import STree from './components/tree/Tree.vue';
// 提示
import SNotice from './components/notice/Notice.vue';
// 表单组件
import SForm from './components/form/Form.vue';
import SFormItem from './components/form/FormItem.vue';
import SInput from './components/form/Input.vue';
// 级联组件
import Cascader from './components/cascader/Cascader.vue';
import cityList from './data.json';

// 级联
// 获取数据
const fetchData = pid => new Promise((res, rej) => {
  setTimeout(() => {
    // ==是因为两边类型不统一
    res(cityList.filter(item => item.pid == pid));
  }, 200);
});

export default {
  name: 'app',
  components: {
    // 树
    STree,
    // 提示
    SNotice,
    // 表单
    SForm,
    SFormItem,
    SInput,
    // 级联
    Cascader,
  },
  data() {
    return {
      // 树
      treeOpt: {
        value: '1',
        children: [
          {
            value: '1-1',
            children: [
              {
                value: '1-1-1',
              },
              {
                value: '1-1-2',
              },
              {
                value: '1-1-3',
              },
            ],
          },
          {
            value: '1-2',
          },
          {
            value: '1-3',
          },
        ],
      },
      // 表单
      model: { username: '', password: '' },
      rules: {
        username: [{ required: true, message: '请输入用户名' }],
        password: [{ required: true, message: '请输入密码' }],
      },
      // 级联
      value: [],
      options: [
        {
          value: '1',
          children: [
            {
              value: '1-1',
              children: [
                {
                  value: '1-1-1',
                },
                {
                  value: '1-1-2',
                },
                {
                  value: '1-1-3',
                },
              ],
            },
            {
              value: '1-2',
            },
            {
              value: '1-3',
            },
          ],
        },
        {
          value: '2',
          children: [
            {
              value: '2-1',
            },
            {
              value: '2-2',
            },
            {
              value: '2-3',
            },
          ],
        },
        {
          value: '3',
          children: [
            {
              value: '3-1',
            },
            {
              value: '3-2',
            },
            {
              value: '3-3',
            },
          ],
        },
      ],
    };
  },
  async created() {
    this.options = await fetchData(0);
  },
  methods: {
    // 表单/提示
    submitForm() {
      this.$refs.loginForm.validate((valid) => {
        this.$create(SNotice, {
          title: '提示',
          message: valid ? '校验通过' : '校验失败',
          duration: 1000,
        });
      });
    },
    // 级联
    async lazyload(id, cb) {
      const children = await fetchData(id);
      cb(children);
    },
  },
};
</script>
<style lang="stylus">
</style>
