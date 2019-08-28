import axios from '../lib/ajaxRequest';

// 登录
export const login = username => axios.request({
  url: '/login',
  method: 'POST',
  data: { username },
});

// 登录校验
export const checkLogin = () => axios.request({
  url: '/validate',
});

// 权限校验
export const getNewRoutes = () => axios.request({
  url: '/roleAuth',
});

// 避免报错
export default {};
