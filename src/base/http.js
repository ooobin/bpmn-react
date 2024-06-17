import axios from "axios";

// 自定义实例
const http = axios.create({
  // baseURL: 'http://192.168.9.16:8081',
  baseURL: 'http://localhost:8080',
  timeout: 5 * 1000
});

// Add a request interceptor
http.interceptors.request.use(
  (config) => {
    // Do something with request data
    return config;
  }, (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
http.interceptors.response.use(
  (res) => {
    // Do something with response data
    return Promise.resolve(res.data);
  }, (error) => {
    // Do something with response error
    return Promise.reject(error);
  },
);

export default http;
