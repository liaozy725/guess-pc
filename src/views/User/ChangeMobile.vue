<template>
  <div class="container">
    <div class="top-item-box" @click="back">
      <Icon type="md-arrow-back" />
      <span>返回</span>
    </div>
    <div class="box-pack">
    <div class="list-box">
      <div class="label-text" v-if="$store.state.userInfo&&$store.state.userInfo.mobileNo">修改手机：</div>
      <div class="label-text" v-else>绑定手机：</div>
      <div class="label-content">
        <Input type="number" v-model="mobileNo"  placeholder="请输入手机号" />
      </div>
    </div>

    <div class="sure-big-btn" @click="submit">确认绑定</div>
    </div>
  </div>
</template>

<script>
import { regPhone } from "@/utils/utils.js";
import {uploadUserInfo} from '@/utils/utils.js';
export default {
  name: "ChangeMobile",
  data() {
    return {
      mobileNo: "", //手机号
      codeText: "发送验证码",
      disabled: false, //判断验证码按钮是否能点击
      userInfo:null,//用户信息
    };
  },
  created() {
    if(this.$store.state.userInfo&&this.$store.state.userInfo.mobileNo){
      this.$store.commit("setPageTitle", "修改手机");
    }else{
      this.$store.commit("setPageTitle", "绑定手机");
    }
    
    this.userInfo=this.$store.state.userInfo||null;
  },
  mounted() {},
  methods: {
    uploadUserInfo:uploadUserInfo,//获取用户详情
    //返回
    back() {
      window.history.back(-1);
    },
    //点击确认
    submit() {
      if (!regPhone(this.mobileNo)) {
        return this.$Message.warning("请输入正确的手机号码");
      }
      let params={
        token:this.$store.state.token,
        mobileNo:this.mobileNo
      }
      this.$http.post("userInfo/bindMobileNo", params).then(res => {
        if (res.retCode == 0) {
          this.$Message.success("操作成功！");
          this.uploadUserInfo();
          this.$router.go(-1);//返回上一层
        }
      });
    },
    // 发送验证码
    sendCode() {
      this.$http.post("userBank/info", params).then(res => {
        if (res.retCode == 0) {
          this.disabled = true;
          let currentTime = 60;
          // 设置发送验证码按钮样式
          let interval = null;
          let _this = this;
          interval = setInterval(function() {
            currentTime--;
            _this.codeText = currentTime + "s后重送";
            if (currentTime <= 0) {
              clearInterval(interval);
              _this.codeText = "获取验证码";
              _this.disabled = false;
            }
          }, 1000);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/color.scss";
a {
  display: block;
}
.container {
  padding: 0 20px;
  .list-box {
    // height: 100px;
    display: flex;
    border-bottom: 1px solid $border-color;
    align-items: center;
    .label-text,
    .label-content {
      color: $gray;
      font-size: 14px;
      height: 50px;
      line-height: 50px;
    }
    .label-text {
      width: 100px;
      float: left;
    }
    .label-content {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
      input {
        width: 100%;
        font-size: 14px;
      }
      .gray-text,
      .check-text {
        font-size: 14px;
        color: #777;
      }
      .check-text {
        color: $gray;
      }
      &.label-content-code {
        display: flex;
        align-items: center;
        input {
          flex: 1;
        }
        .send-code {
          font-size: 14px;
          border-radius: 4px;
          border: 1px solid $yellow;
          color: $yellow;
          height: 30px;
          line-height: 28px;
          width: 80px;
          text-align: center;
        }
      }
    }
  }
  .sure-big-btn {
    margin-top: 150px;
  }
}
</style>

<style lang="css" scoped>
.van-password-input >>> .van-password-input__security li {
  height: 70px;
}
</style>