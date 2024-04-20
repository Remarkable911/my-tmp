import axios from 'axios'
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
const request=axios.create({
    baseURL: 'http://127.0.0.1:5000',
    timeout: 100000,

})
// 添加请求拦截器
request.interceptors.request.use(config => {
    nProgress.start();
    return config;
},function(error){
    return Promise.reject(error);
});
// 添加响应拦截器
request.interceptors.response.use(res => {
    nProgress.done();
    return res;
},function(error){
    return Promise.reject(error);
});
export default request;