import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/common.css' //引入公共css

import router from './router' //引入路由
import './router/request'; // 引入axios配置
import './router/url.js' //引入接口地址表
import store from './vuex/store.js';// 引入vuex 配置store文件

//引入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' //这个样式必须引入
// 简单配置
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })
router.beforeEach((to,from,next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})

import library from './assets/js/library'; //引入公共方法 过滤器
Vue.prototype.library = library;//挂载公共方法
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
