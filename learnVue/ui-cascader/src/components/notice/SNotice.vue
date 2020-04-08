<template>
    <div v-if="vasible">
        <h3>{{title}}</h3>
        <p>{{message}}</p>
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
  components: {
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
