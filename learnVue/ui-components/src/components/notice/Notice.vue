<template>
    <div class="box" v-if="vasible">
        <h3>{{title}}</h3>
        <p class="box-content">{{message}}</p>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '提示',
    },
    message: {
      type: String,
      default: '',
    },
    duration: {
      type: Number,
      default: 1000,
    },
  },
  created() {
    this.show();
  },
  data() {
    return {
      vasible: false,
    };
  },
  methods: {
    show() {
      this.vasible = true;
      setTimeout(this.hide, this.duration);
    },
    hide() {
      this.vasible = false;
      this.remove();
    },
  },
};
</script>

<style scoped>
.box {
  position: fixed;
  width: 100%;
  top: 16px;
  left: 0;
  text-align: center;
  pointer-events: none;
}
.box-content {
  width: 200px;
  margin: 10px auto;
  font-size: 14px;
  border: blue 3px solid;
  padding: 8px 16px;
  background: #fff;
  border-radius: 3px;
  margin-bottom: 8px;
}
</style>
