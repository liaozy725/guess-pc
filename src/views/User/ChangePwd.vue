<template>
  <div class="container">
    <div class="top-item-box" @click="back">
      <Icon type="md-arrow-back" />
      <span>返回</span>
    </div>
    <div class="box-pack">
    <div class="list-box">
      <div class="label-text">旧密码：</div>
      <div class="label-content">
        <input type="password" maxlength="12" minlength="6"  v-model="formData.oldPassword" :change="onInputChange('oldPassword')"  placeholder="请输入旧密码" />
      </div>
    </div>
    <div class="list-box">
      <div class="label-text">新密码：</div>
      <div class="label-content">
        <input type="password" maxlength="12" minlength="6"  v-model="formData.newPassword" :change="onInputChange('newPassword')"  placeholder="6-12位字母或数字" />
      </div>
    </div>
    <div class="list-box">
      <div class="label-text">新密码：</div>
      <div class="label-content">
        <input type="password" maxlength="12" minlength="6"  v-model="formData.confirmPassword" :change="onInputChange('confirmPassword')"  placeholder="请再一次输入您的新密码" />
      </div>
    </div>

    <div class="sure-big-btn" @click="submit">确认修改</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BankcardInfo",
  data() {
    return {
      formData:{
        oldPassword: "", //旧密码
        newPassword: "" ,//新密码
        confirmPassword:'',//确认密码
      }
      
    };
  },
  created() {
    this.$store.commit("setPageTitle", "修改密码");
  },
  mounted() {},
  methods: {
    //返回
    back() {
      window.history.back(-1);
    },
    // 限制输入英文 数字
    onInputChange(key) {
      this.formData[key] = this.formData[key].replace(/[^\a-\z\A-\Z0-9]/g, "");
    },
    //点击确认
    submit() {
      if(!this.formData.oldPassword|| this.formData.oldPassword.length<6){
        return this.$Message.warning("请输入正确的旧密码");
      }
      if(!this.formData.newPassword|| this.formData.newPassword.length <6){
        return this.$Message.warning("请输入正确的新密码");
      }
      if(this.formData.confirmPassword!=this.formData.newPassword){
        return this.$Message.warning("两次密码不一致");
      }
      let params={
        token:this.$store.state.token,
        oldPassword:this.formData.oldPassword,
        newPassword:this.formData.newPassword,
        confirmPassword:this.formData.confirmPassword,
      }
      this.$http.post("userInfo/updateLoginPassword", params).then(res => {
        if (res.retCode == 0) {
          this.$Message.success("操作成功！");
          this.$router.go(-1);//返回上一层
        }
      });
    },
    // 发送验证码
    sendCode() {}
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
      flex: 1;
      input {
        background-color: transparent;
        color: $gray;
        font-size: 15px;
        outline: none;
        height: 40px;
      }
    }
  }
  .sure-big-btn {
    margin-top: 150px;
  }
}
</style>