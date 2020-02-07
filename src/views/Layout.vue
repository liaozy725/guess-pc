<template>
  <div class="layout">
    <div class="layout-header">
      <div class="layout-header-l">
        <router-link to="/layout/home" class="header-box">
          <img src="../assets/games-a.png" alt="">
          <span>游戏大厅</span>
        </router-link>
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
    <user-drawer :visible='showUserMenu' @close='()=>{showUserMenu=false}'></user-drawer>
    <router-view class="layout-view"></router-view>
  </div>
</template>

<script>
import userDrawer from '@/components/UserDrawer.vue';
export default {
  data() {
    return {
      showUserMenu: false,
      showCalendar: false,
    }
  },
  created() {

  },
  components:{userDrawer},
  methods: {
    
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
</style>