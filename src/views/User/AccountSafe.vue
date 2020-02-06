<template>
  <div class="container">
    <div class="top-item-box" @click="back">
      <Icon type="md-arrow-back" />
      <span>返回</span>
    </div>
    <div class="box-pack">
    <div class="list-box">
      <div class="label-text">绑定手机</div>
      <router-link to="/layout/ChangeMobile" class="label-content">
        <span v-if="$store.state.userInfo&&$store.state.userInfo.mobileNo">{{$store.state.userInfo.mobileNo}}</span>
        <img src="../../assets/icon-l.png" class="icon-r" alt />
      </router-link>
    </div>
    <div class="list-box">
      <div class="label-text">修改密码</div>
      <router-link to="/layout/ChangePwd" class="label-content">
        <img src="../../assets/icon-l.png" class="icon-r" alt />
      </router-link>
    </div>
    <!-- <div class="list-box">
      <div class="label-text">支付密码</div>
      <router-link to="/layout/ChangePayPwd" class="label-content">
        <img src="../../assets/icon-l.png" class="icon-r" alt />
      </router-link>
    </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountSafe",
  data() {
    return {
    };
  },
  created() {
    this.$store.commit("setPageTitle", "账户安全");
  },
  mounted() {

  },
  methods: {
    //返回
    back() {
      window.history.back(-1);
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/color.scss";
a {
  display: block;
}
.container {
  padding: 0 40px;
  .list-box {
    // height: 100px;
    display: flex;
    border-bottom: 1px solid $border-color;
    align-items: center;
    .label-text,
    .label-content {
      color: $gray;
      font-size: 15px;
      height: 68px;
      line-height: 68px;
    }
    .label-text {
      width: 100px;
      float: left;
    }
    .label-content {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: right;
      flex: 1;
      input {
        width: 100%;
        font-size: 15px;
      }
      .gray-text,
      .check-text {
        font-size: 27px;
        color: #777;
      }
      .check-text {
        color: $gray;
      }
      &.password-box {
        margin-top: 15px;
      }
      .icon-r {
        width: 7px;
        transform: rotate(180deg);
        vertical-align: middle;
        margin-left: 10px;
      }
      span {
        vertical-align: middle;
        font-size: 15px;
      }
    }
  }
  .sure-big-btn {
    margin-top: 123px;
  }
}
</style>