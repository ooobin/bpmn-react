import axios from "axios";
import qs from "qs";
import API from "../api/api"

// 创建自定义实例
const http = axios.create({
    baseURL: API, // 基础请求地址
    timeout: 5 * 1000, // 请求超时设置
    withCredentials: false, // 跨域请求是否需要携带 cookie
    transformRequest: [(data) => qs.stringify(data)]
});

// 请求拦截器
http.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error.data.error.message);
    },
);

// 响应拦截器
http.interceptors.response.use(
    (res) => {
        // 响应数据处理
        return Promise.resolve(res.data);
    },
    (error) => {
        // 比如： token 过期， 无权限访问， 路径不存在， 服务器问题等
        switch (error.response.status) {
            case 401:
                break;
            case 403:
                break;
            case 404:
                break;
            case 500:
                break;
            default:
                console.log('其他错误信息');
        }
        return Promise.reject(error);
    },
);

export default http;
