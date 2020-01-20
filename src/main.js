import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import {
  Message
} from 'view-design'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import axios from 'axios'

Vue.use(ViewUI);

Vue.config.productionTip = false

if (process.env.NODE_ENV == 'production') {
  // 生产环境
  axios.defaults.baseURL = window.g.baseURL;
} else {
  axios.defaults.baseURL = '/apis/';
}


/* 请求拦截 */
axios.interceptors.request.use(config => {
  NProgress.start();
  // 在发送请求之前做些什么
  config.withCredentials = true;
  return config;
}, error => {
  NProgress.done()
  // 对请求错误做些什么
  Message.error('请求过程中发生了错误');
  return Promise.reject(error);
});

/* 响应处理 */
axios.interceptors.response.use(response => {
  NProgress.done()
  try {
    if (response.data.retCode == '0') {
      return response.data;
    } else if (response.data.retCode == '10002') {
      store.commit('setToken', '');
      router.replace('/jc/login');
    } else {
      Message.error(response.data.errorMsg || '请求异常')
      return response.data;
    }
  } catch (error) {
    Message.error('处理返回的数据发生异常')
  }
}, error => {
  NProgress.done()
  Message.error('网络连接异常,请稍后再试')
  return Promise.reject(error);
})

Vue.prototype.$http = axios;

// 从本地获取token  userInfo 缓存
try {
  let token = sessionStorage.getItem('token');
  let userInfo = sessionStorage.getItem('userInfo');
  if (token) store.commit("setToken", token);
  if (userInfo) store.commit("setUserInfo", JSON.parse(userInfo));
} catch (error) {

}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')