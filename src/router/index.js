import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: '登录',
    component: () => import( /* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/layout',
    name: '',
    component: () => import('../views/Layout.vue'),
    children: [{
      path: '/layout/home',
      name: '首页',
      component: () => import('../views/Home/Home.vue'),
      
    },
  //用户中心-提现
  {path:'/layout/withdraw',name:'withdraw',component: () => import('../views/User/withdraw.vue'),meta: { keepAlive: true ,title:'提现',}},]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router