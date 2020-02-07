<template>
  <Drawer :value="visible" class="user-menu" width="320" :before-close='beforeClose'>
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
      <div class="logout link" @click="logout">{{$store.state.userInfo?'退出登录':'立即登录'}}</div>
    </div>
  </Drawer>
</template>

<script>
export default {
  props:{
    visible:{
      type: Boolean,
      default: true
    }
  },
  data(){
    return {
      showUserMenu: true
    }
  },
  methods:{
    // 跳转
    goToRouterLink(link) {
      if (!this.$store.state.userInfo) {
        return this.$Message.warning("您暂未登录，请先登录");
      }
      this.showUserMenu = false;
      this.$router.push(link);
    },
    // 登出
    logout() {
      localStorage.clear();
      this.$store.commit("setToken", "");
      this.$store.commit("setUserInfo", null);
      this.$router.replace("/login");
    },
    // 关闭钱
    beforeClose(){
      this.$emit('close',false)
    }
  }
  
};
</script>

<style lang="scss" scoped>
@import "../style/color.scss";
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
          &:not(:first-child) {
            position: relative;
          }
          &:not(:first-child)::before {
            content: "";
            position: absolute;
            width: 0;
            left: 0;
            top: 20px;
            height: 30px;
            border-left: 2px solid $gray;
          }
          p {
            margin-top: 4px;
          }
        }
      }
    }
    .menu-list {
      .link {
        padding: 14px 20px;
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