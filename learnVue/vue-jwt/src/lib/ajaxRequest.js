// 封装axios
import axios from 'axios';

class AjaxRequest {
  constructor() {
    this.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '/';
    this.timeout = 2000;
  }

  request(config) {
    // 返回Promise
    const instance = axios.create({
      baseURL: this.baseURL,
      timeout: this.timeout,
    });

    // 设置请求拦截器：向请求头中添加token
    instance.interceptors.request.use((config) => {
      config.headers.Authorization = localStorage.getItem('token');
      return config;
      // 请求出错
    }, err => Promise.reject(err));

    // 设置响应拦截器：返回res中的data
    instance.interceptors.response.use((res) => {
      console.log(res.data);
      return res.data;
    }, err => Promise.reject(err));

    return instance(config);
  }
}

// 每次引入都是新的实例
export default new AjaxRequest();
