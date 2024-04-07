import axios from 'axios'

const http=axios.create({
    baseURL: 'http://192.168.43.139:8000',
    timeout: 100000,

})
// 添加请求拦截器
http.interceptors.request.use(config => {
    return config;
},function(error){
    return Promise.reject(error);
});
// 添加响应拦截器
http.interceptors.response.use(res => {
    return res;
},function(error){
    return Promise.reject(error);
});
export default http;