import axios from 'axios';
const baseURL = 'http://localhost:3002'
// 1. 创建 Axios 实例
const instance = axios.create({
  baseURL: baseURL, // 基础 URL
  timeout: 100000, // 超时时间
  headers: { 'Content-Type': 'application/json' }
});

// 2. 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 添加全局参数（如 Token）
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    // 添加默认参数（如 appId）
    config.params = { ...config.params };

    // 请求前的日志记录
    // console.log('请求发送:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 统一处理成功响应
    if (response.status !== 200) {
      return Promise.reject(response.data);
    }
    return response.data;
  },
  (error) => {
    // 统一错误处理
    // if (error.response) {
    //   switch (error.response.status) {
    //     case 401:
    //       window.location.href = '/login'; // Token 失效跳转登录页
    //       break;
    //     case 403:
    //       alert('权限不足'); 
    //       break;
    //     default:
    //       console.error('请求错误:', error.message);
    //   }
    // }
    return Promise.reject(error);
  }
);

// 4. 取消重复请求机制（可选）
// const pendingRequests = new Map();
// instance.interceptors.request.use((config) => {
//   const requestKey = `${config.method}-${config.url}-${JSON.stringify(config.params)}`;
//   if (pendingRequests.has(requestKey)) {
//     pendingRequests.get(requestKey).cancel('重复请求被取消');
//   }
//   const cancelToken = new axios.CancelToken((cancel) => {
//     pendingRequests.set(requestKey, { cancel });
//   });
//   config.cancelToken = cancelToken;
//   return config;
// });

// instance.interceptors.response.use(
//   (response) => {
//     const requestKey = `${response.config.method}-${response.config.url}-${JSON.stringify(response.config.params)}`;
//     pendingRequests.delete(requestKey);
//     return response;
//   },
//   (error) => {
//     if (axios.isCancel(error)) {
//       console.log('请求取消:', error.message);
//     }
//     return Promise.reject(error);
//   }
// );

export default instance;
