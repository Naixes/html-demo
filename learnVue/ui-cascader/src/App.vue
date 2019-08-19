<template>
  <div id="app">
    <Cascader :options.sync="options"></Cascader>
  </div>
</template>

<script>
import Cascader from './components/Cascader'

export default {
  name: 'app',
  components: {
    Cascader
  },
  data() {
    return {
      options: [
        {
          value: "1",
          children: [
            {
              value: "1-1",
              children: [
                {
                  value: "1-1-1"
                },
                {
                  value: "1-1-2"
                },
                {
                  value: "1-1-3"
                }
              ]
            },
            {
              value: "1-2"
            },
            {
              value: "1-3"
            }
          ]
        },
        {
          value: "2",
          children: [
            {
              value: "2-1"
            },
            {
              value: "2-2"
            },
            {
              value: "2-3"
            }
          ]
        },
        {
          value: "3",
          children: [
            {
              value: "3-1"
            },
            {
              value: "3-2"
            },
            {
              value: "3-3"
            }
          ]
        }
      ]
    }
  }
};
</script>
<style lang="stylus">
</style>
