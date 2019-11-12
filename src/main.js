import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/common.css' //引入公共css

import router from './router' //引入路由
import './router/request'; // 引入axios配置
import './router/url.js' //引入接口地址表
import store from './vuex/store.js';// 引入vuex 配置store文件

import library from './assets/js/library'; //引入公共方法 过滤器

Vue.prototype.library = library;//挂载公共方法
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
