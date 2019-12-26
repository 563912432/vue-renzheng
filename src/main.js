// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/theme/index.css'
import './assets/iconfont/iconfont.css'
import axios from 'axios'
import qs from 'qs'
// 表格插件
import JsonExcel from 'vue-json-excel'
import Cookies from 'js-cookie'

Vue.component('downloadExcel', JsonExcel)
Vue.use(ElementUI, {size: 'small', zIndex: 3000})

Vue.config.productionTip = false


window.axios = axios
window.Cookies = Cookies

// let params = Cookies.get('PARAMS')
// if (params) {
//   store.state.params = params
// }
// store.commit('resetModeAndRole');

const host_url = {1: '/admin/v1/admin/', 2: '/org/v1/org/', 3: '/stu/v1/stu/'}
// let scope = Cookies.get('scope')
let scope = 1
window.host = 'http://117.50.43.204:8000' + host_url[scope] + 'rz/';

axios.interceptors.request.use(config => {
      // let Token = Cookies.get('YPJ-ACCESS-TOKEN')
      let Token = '123123123'
      config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': Token
      }
      // 在发送请求之前做些什么
      config.data = qs.stringify(config.data) // 转为formdata数据格式
      return config
    },
    error => {
      // 对请求错误做些什么
      // console.log(error) // for debug
      return Promise.reject(error)
    })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
