import axios from "axios";
import qs from "qs";

const url = document.getElementById("url").innerText;
const baseURL = `http://${url}/`;

// 创建自定义实例
const http = axios.create({
    baseURL, // 基础请求地址
    timeout: 10000, // 请求超时设置
    withCredentials: false, // 跨域请求是否需要携带 cookie
});

// 请求拦截器
http.interceptors.request.use(
    (config) => {
        console.log(config);
        config.data = qs.stringify(config.data);
        // 请求数据处理
        return config;
    },
    (error) => {
        return Promise.reject(error.data.error.message);
    },
);

// 响应拦截器
http.interceptors.response.use(
    (res) => {
        console.log(res);
        // 响应数据处理
        return res.data;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default http;
