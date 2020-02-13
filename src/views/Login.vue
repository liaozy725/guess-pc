<template>
  <div class="login">
    <div class="logo-box">
      <img src="../assets/login-logo.png" alt="" class="logo">
    </div>
    <div class="main">
      <div class="login-box form-box" v-if="isLogin">
        <Form ref="loginForm" :model='loginForm' :rules='loginRules' inline>
          <p class="title">登录</p>
          <FormItem class="input-box" prop='loginAccount'>
            <Input v-model="loginForm.loginAccount" prefix='md-person' placeholder="请输入用户名" />
          </FormItem>
          <FormItem class="input-box" prop='loginPassword'>
            <Input v-model="loginForm.loginPassword" prefix='md-lock' type="password" placeholder="请输入密码" />
          </FormItem>
          <div class="other">
            <span @click="isLogin=false">账号注册</span>
            <span>忘记密码</span>
          </div>
          <Button long @click="login" @keyup.enter='login'>登录</Button>
          <router-link to="/layout/home" class="back">我先逛逛</router-link>
        </Form>
      </div>
      <div class="sign-box form-box" v-else>
        <Form ref="signInForm" :model='signIn' :rules='signInRules' inline>
          <p class="title">注册</p>
          <FormItem class="input-box" prop='loginAccount'>
            <Input v-model="signIn.loginAccount" prefix='md-person' placeholder="用户名（4-12位小写字母或数字）" />
          </FormItem>
          <FormItem class="input-box" prop='loginPassword'>
            <Input v-model="signIn.loginPassword" prefix='md-lock' type="password" placeholder="密码（6-12位小写字母或数字）" />
          </FormItem>
          <FormItem class="input-box" prop='confirmPassword'>
            <Input v-model="signIn.confirmPassword" prefix='md-lock' type="password" placeholder="请再次输入密码" />
          </FormItem>
          <FormItem class="input-box" prop='invitationCode'>
            <Input v-model="signIn.invitationCode" prefix='md-contacts' placeholder="推荐码（非必填）" />
          </FormItem>
          <Button long @click="registerFun">注册</Button>
          <p class="back" @click="isLogin=true">返回登录</p>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadUserInfo } from '@/utils/utils.js';
export default {
  data() {
    return {
      loginForm: {
        loginAccount: "",
        loginPassword: ""
      },
      signIn: {
        loginAccount: "",
        loginPassword: "",
        confirmPassword: "",
        invitationCode: ""
      },
      loginRules: {
        loginAccount: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        loginPassword: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      signInRules: {
        loginAccount: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^(?![0-9]+$)|(?![a-zA-Z]+$)[0-9A-Za-z]{4,12}$/, message: '请填写4-12位字母或数字', trigger: 'blur' },
        ],
        loginPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^(?![0-9]+$)|(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/, message: '请填写6-12位字母或数字', trigger: 'blur' },
        ],
        confirmPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^(?![0-9]+$)|(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/, message: '请填写6-12位字母或数字', trigger: 'blur' },
        ]
      },
      isLogin: true, // 是否登录
      readonly: false
    }
  },
  methods: {
    uploadUserInfo: uploadUserInfo,//获取用户详情
    // 登录
    login() {
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          let ip = returnCitySN["cip"];
          this.loginForm.ip = ip;
          this.$http.post("account/login", this.loginForm).then(res => {
            if (res.retCode == 0) {
              this.$store.commit("setToken", res.data.token);
              this.uploadUserInfo();
              this.$router.replace("/layout/home");
            }
          });
        }
      })
    },
    // 注册
    registerFun() {
      this.$refs['signInForm'].validate(valid => {
        if (valid) {
          if (this.signIn.loginPassword !== this.signIn.confirmPassword) {
            return this.$Message.warning('密码输入不一致!')
          }
          this.$http.post("account/register", this.signIn).then(res => {
            if (res.retCode == 0) {
              this.$Message.success('注册成功！');
              this.loginForm.loginAccount = this.signIn.loginAccount;
              this.isLogin = true;
            }
          });
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  background: url(../assets/login-bg.jpg) no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  .logo-box {
    text-align: center;
    width: 60%;
  }
  .main {
    .form-box {
      width: 383px;
      background: rgba(255, 255, 255, 0.1);
      border: solid 2px #ffffff;
      padding: 20px 24px;
      text-align: center;
      border-radius: 10px;
      .title {
        font-size: 26px;
        color: #fff;
        font-weight: bold;
        margin-bottom: 50px;
      }
      .input-box {
        margin-bottom: 16px;
        width: 100%;
      }
      .other {
        display: flex;
        color: #fff;
        margin-bottom: 40px;
        margin-top: 10px;
        span {
          flex: 1;
          text-align: left;
          cursor: pointer;
          &:last-child {
            text-align: right;
          }
        }
      }
      .back {
        color: #fff;
        display: block;
        margin-top: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>