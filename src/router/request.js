import Vue from 'vue';
import './url';
import router from './index'; //如果需要用
import store from '../vuex/store.js'; //如果需要用


// 引入axios配置
import axios from 'axios';
Vue.prototype.$axios = axios;
// 请求错误处理
var errorFn = function (err) {
    if (err.toString().indexOf('timeout') != -1) {
        Vue.prototype.$message.error('请求超时，请稍后再试');
    } else if (err.toString().indexOf('Network') != -1) {
        Vue.prototype.$message.error('连接错误，请检查网络');
    }
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
            err.message = '请求错误';
            break;
    
            case 401:
            err.message = '未授权，请登录';
            break;
    
            case 403:
            err.message = '拒绝访问';
            break;
    
            case 404:
            err.message = `请求地址出错: ${err.response.config.url}`;
            break;
    
            case 408:
            err.message = '请求超时';
            break;
    
            case 500:
            err.message = '服务器开个小差，请稍后再试';
            break;
    
            case 501:
            err.message = '服务器开个小差，请稍后再试';
            break;
    
            case 502:
            err.message = '服务器开个小差，请稍后再试';
            break;
    
            case 503:
            err.message = '服务器开个小差，请稍后再试';
            break;
    
            case 504:
            err.message = '服务器开个小差，请稍后再试';
            break;
    
            case 505:
            err.message = 'HTTP版本不受支持';
            break;
    
            default:
            err.message = '请求失败，请稍后再试';
        }
        Vue.prototype.$message.error(err.message);
    }
    return Promise.reject(err);
};
// 设置请求参数url 随机 防止ie缓存
function changeURLArg(url = '', arg = '', arg_val = '') {
    var pattern = arg + '=([^&]*)';
    var replaceText = arg + '=' + arg_val;
    if (url.match(pattern)) {
        var reg = new RegExp('(' + arg + '=)([^&]*)', 'gi');
        return url.replace(reg, replaceText);
    } else {
        if (url.match('[\?]')) {
        return url + '&' + replaceText;
        } else {
        return url + '?' + replaceText;
        }
    }
}
// 接口返回数据提示
var responseFn = function (response){
    if (response.data.code == '200'){
        Vue.prototype.$message.success(response.data.message || response.data.rspMsg);
    }else{
        // 某个状态 跳回登陆
        // router.push({
        //     name: 'Login'
        // });
    }
}

// 封装实例化
let httpRequest= axios.create({
    baseURL: '/api',//是否配置请求前缀
    timeout: 30000,// 超时时间 30s
})
httpRequest.interceptors.request.use(
    config => {
        config.url=changeURLArg(config.url, 't', new Date().getTime());//防止ie缓存
        if(store.state&&store.state.common.token){//设置token 从vuex里面取
             config.headers.authorization = store.state.common.token; //是否设置请求头
        }
        return config;
    },
    err => {
        return null
    }
)
httpRequest.interceptors.response.use(
    response => {
        return response;
    }, 
    errorFn, //接口返回状态码 根据状态码 给出提示
    responseFn
);
Vue.prototype.httpRequest = httpRequest;

