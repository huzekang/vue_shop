import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'

// 导入 NProgress包对应的js和css
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

import axios from 'axios'

// 配置请求的跟路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

// 在request拦截器中，配置请求的header加入token和展示进度条
axios.interceptors.request.use(config => {
  // 展示进度条
  nprogress.start()
  // console.log(config)
  // 从sessionStorage中取出token放入请求的header
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须return config
  return config
})

// 在response拦截器中，隐藏进度条
axios.interceptors.response.use(config => {
  nprogress.done()
  // 在最后必须return config
  return config
})

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
