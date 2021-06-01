<!--  -->
<template>
  <div>
    <h1 class="home">Home</h1>
    <ul>
      <li>{{ userInfo.name }}</li>
      <li>{{ userInfo.address }}</li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: 'Home',
  setup() {
    const { commit, getters } = useStore();
    const userInfo = computed(() => getters["demo/getData"]);
    const fetchData = async () => {
      const { data } = await axios.get(
        "https://www.fastmock.site/mock/408a0aa430e1783a6cec0c0706aeea8e/test/api/ssr"
      );
      console.log("data", data);
      commit("demo/setData", data.info);
    };
    // 判断是否已经注入
    if (userInfo.value.name === "sin" && typeof window !== "undefined") {
      fetchData();
    }
    return {
      userInfo,
      fetchData,
    };
  },
  // 只有服务端才会调用
  async serverPrefetch() {
    console.log("prefetchdata在服务端执行");
    await this.fetchData();
  },
}

</script>

<style scoped>
.home {
    color: red;
}
</style>