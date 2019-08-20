<template>
  <div id="app">
    <Cascader :options.sync="options" v-model="value" :lazyload="lazyload"></Cascader>
  </div>
</template>

<script>
import Cascader from './components/Cascader.vue';
import cityList from './data.json';

// 获取数据
const fetchData = pid => new Promise((res, rej) => {
  setTimeout(() => {
    res(cityList.filter(item => item.pid == pid));
  }, 200);
});

export default {
  name: 'app',
  components: {
    Cascader,
  },
  data() {
    return {
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
    async lazyload(id, cb) {
      const children = await fetchData(id);
      cb(children);
    },
  },
};
</script>
<style lang="stylus">
</style>
