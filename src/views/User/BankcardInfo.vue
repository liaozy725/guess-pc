<template>
  <div class="container" v-if="bankInfo">
    <div class="top-item-box" @click="back">
      <Icon type="md-arrow-back" /><span>返回</span>
    </div>
    <div class="box-pack">
      <div class="list-com">
        <div class="list-box" >
        <div class="label-text">开户名称</div>
        <div class="label-content">{{bankInfo.bankUserName}}</div>
      </div>
      <div class="list-box">
        <div class="label-text">银行卡号</div>
        <div class="label-content">{{bankInfo.bankNo}}</div>
      </div>
      <div class="list-box">
        <div class="label-text">开户省份</div>
        <div class="label-content">{{bankInfo.bankProvince}}</div>
      </div>
      <div class="list-box">
        <div class="label-text">开户城市</div>
        <div class="label-content">{{bankInfo.bankCity}}</div>
      </div>
      <div class="list-box">
        <div class="label-text">开户银行</div>
        <div class="label-content">{{bankInfo.bankName}}</div>
      </div>
      <div class="list-box">
        <div class="label-text">开户支行</div>
        <div class="label-content">{{bankInfo.bankBranch}}</div>
      </div>
      </div>
      <div class="sure-big-btn" @click="edit">编辑</div>
  </div>
  </div>
</template>

<script>
export default {
  name: "BankcardInfo",
  data() {
    return {
      bankInfo:null,//银行卡详情
    };
  },
  created(){
    this.$store.commit("setPageTitle","银行卡");
  },
  mounted() {
    this.getBankInfo();
  },
  methods: {
    //返回
    back() {
      window.history.back(-1); 
    },
    //跳转编辑页面
    edit(){
      this.$router.push({path:'/jc/layout/BankcardEdit',query:{id:this.bankInfo.id||null}})
    },
    //获取银行卡信息
    getBankInfo() {
      var params={
        token:this.$store.state.token
      }
      this.$http.post("userBank/info", params).then(res => {
        if (res.retCode == 0) {
          if (!!res.data) {
            this.bankInfo = res.data;
          } 
        }
      });
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
  .list-com{
     padding: 0 40px;
    background-color: #35333b;
    border-radius: 5px;
  }
  .list-box{
       
    display: flex;
    border-bottom: 1px solid $gray;
    align-items: center;
    .label-text,.label-content{
      color: $gray;
      font-size: 15px;
      height: 68px;
      line-height: 68px;
    }
    .label-text{
      width: 100px;
    }
    .label-content{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
    }
  }
  .list-box:last-child{
    border:none;
  }
  .sure-big-btn{
    margin-top: 80px;
  }
}
</style>

<style lang="css" scoped>
</style>