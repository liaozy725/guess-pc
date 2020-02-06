<template>
  <div class="container">
    <!-- <div class="list-box">
      <div class="label-text">旧密码：</div>
      <div class="label-content pwd-box">
        <van-password-input :value="password" :length="6" :gutter="10" :focused="showKeyboard" @focus="showKeyboard = true" />
      </div>
    </div> -->
    <div class="top-item-box" @click="back">
      <Icon type="md-arrow-back" /><span>返回</span>
    </div>
    <div class="box-pack">
    <div class="list-box">
      <div class="label-text">支付密码：</div>
      <div class="label-content password-box">
        <!-- 密码输入框 -->
        <input
                v-model="formData.password"
                maxlength="6"
                type="password"
                placeholder="请输入6位数字支付密码"
              />
        <!-- <van-password-input :value="formData.password" :length="6" :gutter="4" :focused="activeInput=='password'&&showKeyboard" @focus="activeInput='password';showKeyboard = true" /> -->
        <!-- <input type="number" v-model="mobileNo"  placeholder="请输入手机号" /> -->
      </div>
    </div>
    <div class="list-box">
      <div class="label-text">确认密码：</div>
      <div class="label-content password-box">
        <!-- 密码输入框 -->
        <input
                v-model="formData.confirmPassword"
                maxlength="6"
                type="password"
                placeholder="请再次输入支付密码"
              />
         <!-- <van-password-input :value="formData.confirmPassword" :length="6" :gutter="4" :focused="activeInput=='confirmPassword'&&showKeyboard" @focus="activeInput='confirmPassword';showKeyboard = true" /> -->
      </div>
    </div>

    <div class="sure-big-btn" @click="submit">确认绑定</div>
    <!-- 支付键盘 -->
    <!-- <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" @blur="showKeyboard = false" /> -->
  </div>
  </div>
</template>

<script>
import {uploadUserInfo} from '@/utils/utils.js';
// let iconSuccess = require('@/assets/icon-success.png');
// let iconWarning = require('@/assets/icon-warning.png');
export default {
  name: "BankcardInfo",
  data() {
    return {
      confirmPassword: "", //确认密码
      password: '',//支付密码
      showKeyboard: false, //控制支付密码键盘
      formData:{
        confirmPassword:'',
        password:''
      },
      activeInput:''
    };
  },
  created() {
    this.$store.commit("setPageTitle", "支付密码");
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
      if(!this.formData.password|| this.formData.password.length !=6){
        return this.$Message.warning({
          duration: 2,
          content: "请输入正确的支付密码"
        });
      }else{
        var stuCardReg = /^[0-9]{6}/;
        if (!stuCardReg.test(this.formData.password)) {
            return this.$Message.warning({
            duration: 2,
            content: "支付密码格式不正确"
          });
        }
      }
      if(!this.formData.confirmPassword|| this.formData.confirmPassword.length !=6){
        return this.$Message.warning({
          duration: 2,
          content: "请输入正确的确认支付密码"
        });
      }
      if(this.formData.password!=this.formData.confirmPassword){
        return this.$Message.warning({
          duration: 2,
          content: "两次密码不一致"
        });
      }
      let params={
        token:this.$store.state.token,
        payPassword:this.formData.password
      }
      this.$http.post("userInfo/setPassword", params).then(res => {
        if (res.retCode == 0) {
          this.$Message.warning.success({
            duration: 2,
            content: "操作成功！"
          });
          
          this.$router.go(-1);//返回上一层
        }
        this.uploadUserInfo();
      });
    },
    //点击输入支付密码
    onInput(key) {
      this.formData[this.activeInput] = (this.formData[this.activeInput] + key).slice(0, 6);
      if(this.formData[this.activeInput].length>=6){
        this.showKeyboard =false;
      }
    },
    //点击删除支付密码
    onDelete() {
      this.formData[this.activeInput]= this.formData[this.activeInput].slice(0, this.formData[this.activeInput].length - 1);
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
  padding: 0 40px;
  .list-box {
    // display: flex;
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
    .password-box {
      
    }
    .label-content {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: flex;
      align-items: center;
      flex: 1;
      input {
        background-color: transparent;
        color: $gray;
        font-size: 15px;
        outline: none;
        height: 40px;
      }
      .gray-text,
      .check-text {
        font-size: 27px;
        color: #777;
      }
      .check-text {
        color: $gray;
      }
      &.pwd-box {
        margin-top: 30px;
      }
    }
  }
  .sure-big-btn {
    margin-top: 247px;
  }
}
</style>

<style lang="css" scoped>

</style>