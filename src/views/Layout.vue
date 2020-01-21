<template>
  <div class="layout">
    <div class="layout-header">
      <div class="layout-header-l">
        <div class="header-box">
          <img src="../assets/games-a.png" alt="">
          <span>游戏大厅</span>
        </div>
        <div class="header-box">
          <img src="../assets/icon-res.png" alt="">
          <span>赛果</span>
        </div>
      </div>
      <div class="layout-header-r">
        <div class="header-box">
          <img src="../assets/icon-gz.png" alt="">
          <span>电竞规则</span>
        </div>
        <div class="header-box" @click="showUserMenu = !showUserMenu">
          <img src="../assets/icon-user.png" alt="">
          <span v-if="$store.state.userInfo">{{$store.state.userInfo.accountLogin}}</span>
          <span v-else>暂未登录</span>
        </div>
      </div>
    </div>
    <Drawer v-model='showUserMenu' class="user-menu" width='320'>
      <div class="header">
        <div @click="goToRouterLink('/layout/pay')" class="item">
          <label>余额</label>
          <p v-if="$store.state.userInfo">{{$store.state.userInfo.userBalance||0}}</p>
          <p v-else>0</p>
        </div>
        <div @click="goToRouterLink('/layout/withdraw')" class="item">
          <label>可提</label>
          <p v-if="$store.state.userInfo">{{$store.state.userInfo.userBalance}}</p>
          <p v-else>0</p>
        </div>
        <div @click="goToRouterLink('/layout/Bonus')" class="item">
          <label>奖金</label>
          <p v-if="$store.state.userInfo">{{$store.state.userInfo.userPrize}}</p>
          <p v-else>0</p>
        </div>
      </div>
      <div class="menu-list">
        <div @click='goToRouterLink("/layout/pay")' class="link">充值</div>
        <div @click='goToRouterLink("/layout/withdraw")' class="link">提现</div>
        <div @click='goToRouterLink("/layout/GuessHistory")' class="link">投注历史</div>
        <div @click='goToRouterLink("/layout/stream")' class="link">财务流水</div>
        <div @click='goToRouterLink("/layout/AccountSafe")' class="link">账号安全</div>
        <div @click='goToRouterLink("/layout/SystemMsg")' class="link">系统消息</div>
        <div @click='goToRouterLink("/layout/home")' class="link">联系客服</div>
        <div class="logout link" @click="logout">退出登录</div>
      </div>

    </Drawer>
    <router-view class="layout-view"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showUserMenu: false,
      showCalendar: false,
    }
  },
  created() {

  },
  methods: {
    // 跳转
    goToRouterLink(link) {
      if (!this.$store.state.userInfo) {
        return this.$dialog.confirm({
          title: '提示',
          message: "您暂未登录，请先登录",
          confirmButtonText: '立即登录'
        }).then(() => {
          this.$router.replace('/login')
        }).catch(() => {
          this.showUserMenu = false;
        })
      }
      this.showUserMenu = false;
      this.$router.push(link)
    },
    // 登出
    logout() {
      localStorage.clear();
      this.$store.commit('setToken', '')
      this.$store.commit('setUserInfo', null)
      this.$router.replace("/login");
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../style/color.scss";
.layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  .layout-header {
    height: 48px;
    background: $dark333;
    display: flex;
    > div {
      flex: 1;
      display: flex;
      align-items: center;
      .header-box {
        display: inline-block;
        padding: 0 45px;
        cursor: pointer;
        &:not(:first-child) {
          border-left: 2px solid #9e8558;
        }
        img {
          vertical-align: middle;
          margin-right: 20px;
        }
        span {
          color: $dark777;
          vertical-align: middle;
          font-size: 16px;
        }
      }
    }
    .layout-header-r {
      justify-content: flex-end;
    }
  }
  .layout-view {
    flex: 1;
    background: $dark000;
    overflow: auto;
  }
}
// 用户信息
.user-menu {
  /deep/.ivu-drawer {
    top: 48px;
    .ivu-drawer-content {
      background: $dark333;
      color: $gray;

      .header {
        display: flex;
        margin-top: 20px;
        .item {
          flex: 1;
          text-align: center;
          font-size: 18px;
          cursor: pointer;
          padding: 20px 0;
          border-radius: 10px;
          &:hover {
            background: $dark111;
          }
          &:not(:first-child){
            position: relative;
          }
          &:not(:first-child)::before{
            content: '';
            position: absolute;
            width: 0;
            left: 0;
            top: 30px;
            height: 30px;
            border-left: 2px solid $gray;
          }
          p{
            margin-top: 4px;
          }
        }
      }
    }
    .menu-list {
      .link {
        padding: 20px;
        font-size: 16px;
        cursor: pointer;
        color: $gray;
        &:hover {
          background: $dark111;
        }
      }
      .logout {
        color: #89868f;
      }
    }
  }
}
</style>