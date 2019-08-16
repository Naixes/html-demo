<template>
  <div class="login">
    <el-input v-model="username" style="width: 200px;"></el-input>
    <el-button @click="login">登录</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
    };
  },
  methods: {
    login() {
      // 使用vuex管理用户名
      this.$store.dispatch('login', this.username).then((data) => {
        if (data.code === 0) {
          console.log(data.code);
          this.$router.push('/profile');
        }
      });
    },
  },
};
</script>
