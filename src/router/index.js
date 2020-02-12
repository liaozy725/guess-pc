import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'首页',
    redirect:'/layout/home'
  },
  {
    path: '/login',
    name: '登录',
    component: () => import( /* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/layout',
    name: '',
    component: () => import('../views/Layout.vue'),
    redirect: '/layout/home',
    children: [
      {
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
      // 赛果
      {
        path: '/layout/GuessRes',
        name: '赛果',
        component: () => import('../views/Home/GuessRes.vue'),
      },
      // 赛果详情
      {
        path: '/layout/GuessResDetail',
        name: '赛果详情',
        component: () => import('../views/Home/GuessResDetail.vue'),
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
      //用户中心-支付密码设置
      {
        path: '/layout/ChangePayPwd',
        name: 'ChangePayPwd',
        component: () => import('@/views/User/ChangePayPwd.vue'),
        meta: {
          keepAlive: true,
          title: '支付密码设置',
        }
      },
      //用户中心-财务流水
      {
        path: '/layout/stream',
        name: 'stream',
        component: () => import('@/views/User/stream.vue'),
        meta: {
          keepAlive: true,
          title: '财务流水',
        }
      },
      //用户中心-投注历史
      {
        path: '/layout/GuessHistory',
        name: 'GuessHistory',
        component: () => import('@/views/Home/GuessHistory.vue'),
        meta: {
          keepAlive: true,
          title: '投注历史',
        }
      },
      //用户中心-账号安全
      {
        path: '/layout/AccountSafe',
        name: 'AccountSafe',
        component: () => import('@/views/User/AccountSafe.vue'),
        meta: {
          keepAlive: true,
          title: '账号安全',
        }
      },
      //用户中心-绑定手机
      {
        path: '/layout/ChangeMobile',
        name: 'ChangeMobile',
        component: () => import('@/views/User/ChangeMobile.vue'),
        meta: {
          keepAlive: true,
          title: '绑定手机',
        }
      },
      //用户中心-修改密码
      {
        path: '/layout/ChangePwd',
        name: 'ChangePwd',
        component: () => import('@/views/User/ChangePwd.vue'),
        meta: {
          keepAlive: true,
          title: '修改密码',
        }
      },
      //用户中心-系统消息
      {
        path: '/layout/SystemMsg',
        name: 'SystemMsg',
        component: () => import('@/views/User/SystemMsg.vue'),
        meta: {
          keepAlive: true,
          title: '系统消息',
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