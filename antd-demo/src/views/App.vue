<template>
<a-locale-provider :locale="zh_CN">
  <a-layout id="components-layout-demo-side" style="height: 100vh">
    <!-- :trigger="null"：隐藏导航的trigger 
    style：覆盖默认的行内样式-->
    <a-layout-sider
      collapsible
      v-model="collapsed"
      :trigger="null"
      style="min-width: 256px; "
      defaultCollapsed
    >
      <div class="logo">
        <span id="logo-title">代理交互平台管理系统</span>
      </div>
      <a-menu theme="dark" :defaultSelectedKeys="['1']" mode="inline">
        <a-sub-menu
          key="sub1"
        >
          <span slot="title"><img class="menu-icon" src="../assets/menu/admin.png" alt=""><span class="menu-title">系统用户</span></span>
          <a-menu-item key="3" @click="toCustomList">系统用户管理</a-menu-item>
          <a-menu-item key="4" @click="toCustomPermission">权限组</a-menu-item>
        </a-sub-menu>
        <a-sub-menu
          key="sub2"
        >
          <span slot="title"><img class="menu-icon" src="../assets/menu/user.png" alt=""><span class="menu-title">前端用户</span></span>
          <a-menu-item key="5">Team 1</a-menu-item>
          <a-menu-item key="6">Team 2</a-menu-item>
          <a-menu-item key="7">Team 3</a-menu-item>
          <a-menu-item key="8">Team 4</a-menu-item>
          <a-menu-item key="9">Team 5</a-menu-item>
          <a-menu-item key="10">Team 6</a-menu-item>
          <a-menu-item key="11">Team 7</a-menu-item>
          <a-menu-item key="12">Team 8</a-menu-item>
          <a-menu-item key="13">Team 9</a-menu-item>
          <a-menu-item key="14">Team 10</a-menu-item>
          <a-menu-item key="15">Team 11</a-menu-item>
          <a-menu-item key="16">Team 12</a-menu-item>
          <a-menu-item key="17">Team 13</a-menu-item>
          <a-menu-item key="18">Team 14</a-menu-item>
          <a-menu-item key="19">Team 15</a-menu-item>
          <a-menu-item key="20">Team 16</a-menu-item>
          <a-menu-item key="21">Team 17</a-menu-item>
          <a-menu-item key="22">Team 18</a-menu-item>
          <a-menu-item key="23">Team 19</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="9">
          <img class="menu-icon" src="../assets/menu/team.png" alt="">
          <span class="menu-title">团队管理</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <div class="account">
          <img src="../assets/layout/top_head_def.png" alt="">
          Admin
        </div>
      </a-layout-header>
      <!-- 路由部分 -->
      <router-view></router-view>
    </a-layout>
  </a-layout>
  </a-locale-provider>
</template>
<script>
// 国际化
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';

import router from "../router/index.js"

export default {
  data() {
    return {
      zh_CN,
      collapsed: false,
    }
  },
  methods: {
    toCustomList() {
      router.push('/system/customList')
    },
    toCustomPermission() {
      router.push('/system/customPermission')
    }
  }
}
</script>

<style lang="less">
body {
  min-width: 1200px;
  // 隐藏滚动条
  overflow: hidden;
}
#components-layout-demo-side {

  .ant-layout-sider {
    .ant-layout {
      overflow-y: auto;
    }
    .ant-layout-sider-children {
      position: fixed; 
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .ant-menu {
      overflow-y: auto;
      flex: 1;
    }
    // 隐藏滚动条
    .ant-menu::-webkit-scrollbar {
        display: none;
    }
    .logo {
      height: 74px;
      background:rgba(0,33,64,1);
      padding: 0 38px;
      padding-top: 25px;

      #logo-title {
        width:180px;
        height:25px;
        font-size:18px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:25px;
      }
    }

    // 导航图标
    .ant-menu-submenu-title, .ant-menu-item {

      .menu-icon {
        width:14px;
        height:14px;
      }
      .menu-title {
        padding-left: 13px;
      }
    }
  }
  // 头部样式
  .ant-layout-header {
    // 固定
    position: sticky;
    top: 0;

    z-index: 1000;
    min-height: 74px;
    .account {
      display: flex;
      align-items: center;
      float: right;
      padding: 5px 24px;
      img {
        width: 24px;
        height: 24px;
        margin-right: 8px;
      }
    }
  }
}
</style>
