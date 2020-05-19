<template>
  <div>
    <h1>This is an login page</h1>
    <div>
      <input v-model="username">
      <button @click="login">登录</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "admin"
    };
  },
  methods: {
    login() {
      // 派发一个登录action
      this.$store
        .dispatch("user/login", { username: this.username })
        .then(() => {
          // 登录成功重定向
          this.$router.push({
            path: this.$route.query.redirect || "/"
          });
        })
        .catch(error => {
            alert(error)
        });
    }
  }
};
</script>
