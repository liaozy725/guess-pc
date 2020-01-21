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
      // 竞猜详情
      {
        path: '/layout/GuessDetail',
        name: '竞猜详情',
        component: () => import('../views/Home/GuessDetail.vue'),
      },
      //用户中心-提现
      {
        path: '/layout/withdraw',
        name: 'withdraw',
        component: () => import('../views/User/withdraw.vue'),
        meta: {
          keepAlive: true,
          title: '提现',
        }
      }, //用户中心-充值
      {
        path: '/layout/pay',
        name: 'pay',
        component: () => import('../views/User/pay.vue'),
        meta: {
          keepAlive: true,
          title: '充值',
        }
      },
      //用户中心-银行卡详情表
      {
        path: '/layout/BankcardInfo',
        name: 'BankcardInfo',
        component: () => import('@/views/User/BankcardInfo.vue'),
        meta: {
          keepAlive: true,
          title: '银行卡',
        }
      },
      //用户中心-银行卡编辑
      {
        path: '/layout/BankcardEdit',
        name: 'BankcardEdit',
        component: () => import('@/views/User/BankcardEdit.vue'),
        meta: {
          keepAlive: true,
          title: '编辑银行卡',
        }
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router