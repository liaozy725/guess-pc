<template>
  <div class="container">
    <div class="top-item-box" @click="back">
      <Icon type="md-arrow-back" /><span>返回</span>
    </div>
    <div class="box-pack">
      
    <div class="pay-type between">
      <div class="img-box zfb-img" @click="changePay('alipay')" :class="activeTab=='alipay'?'active':''">
        <img src="../../assets/logo-zfb.png" alt="">
        <i></i>
      </div>
      <div class="img-box wx-img" @click="changePay('wechant')" :class="activeTab=='wechant'?'active':''">
        <img src="../../assets/logo-wx.png" alt="">
        <i></i>
      </div>
    </div>
    <!-- 充值框 -->
    <div class="content-box">
      <div class="content-top clearfix">
        <div class="fl content-top-l">
          充值金额范围：100-10000
        </div>
        <div class="rt content-top-r" v-if="$store.state.userInfo&&$store.state.userInfo.userBalance">
          账户余额：{{$store.state.userInfo.userBalance}}
        </div>
      </div>
      <div class="content-body">
        <div class="input-box">
           <InputNumber
              :max="10000"
              placeholder="请输入充值金额"
              :min="0"
              v-model="price"
            ></InputNumber>
        </div>
        <div class="price-list clearfix">
          <div class="price-box fl" @click="assignment(item)" v-for="(item,i) in priceList" :key="i">{{item.number}}</div>
        </div>
      </div>
    </div>
    <!-- 充值按钮 -->
    <div class="sure-big-btn" @click="sureBtn">充值</div>
    <div class="prompt">提示：近期充值渠道不太稳定，若遇到充值不成功，请多尝试几次或联系客服，给您带来不便，敬请见谅。</div>
    <!-- 支付确认弹框 -->
    <Modal
        v-model="showShopCar"
        width="400"
        class="modal-common"
        footer-hide
        title="支付"
        :mask-closable="false"
        :closable="false"
      >
    <div class="model-box" >
      <p v-if="isFinish">你的支付请求已提交</p>
      <Icon class="close-btn" @click="clearModel" type="ios-close" />
      <div class="model-text between">
        <div class="model-label">充值方式：</div>
        <div class="model-label" v-if='activeTab=="alipay"'>支付宝</div>
        <div class="model-label" v-else>微信</div>
      </div>
      <div class="model-text between">
        <div class="model-label">充值金额：</div>
        <div class="model-label model-price">{{price}}</div>
      </div>

      <div class="btn-box between" v-if="isFinish">
        <div class="btn sure-big-btn" @click="successBtn">支付完成</div>
        <div class="btn sure-big-btn matter-btn">支付遇到问题</div>
      </div>
      <div class="sure-big-btn" v-else @click="submit">确认支付</div>
    </div>
    </Modal>
    <!-- 二维码弹框 -->
    <Modal
        v-model="showCode"
        width="400"
        class="modal-showcode-common"
        footer-hide
        :closable="false"
        :mask-closable="false"
      >
    <div class="codePop-box">
      <div class="close-box" @click="clearCodeModel"></div>
      <p>请扫码支付，长按保存二维码</p> -->
      <div class="top-box">订单号：{{orderNo}}</div>
      <div class="top-text-box">
        <span>支付确认时，确保与订单支付金额保持一致</span>
        <i></i>
      </div>
      <div class="content-box">
        <div class="price">¥{{price}}</div>
        <div class="code-box">
          <img v-if="codeUrl" :src="codeUrl" alt />
        </div>
        <div class="top-text-box">
          <span>重复支付和修改金额无法到账，概不负责</span>
        </div>
        <div class="term-box">
          <div class="list-box">
            <p>1</p>
            <span>长按/截图，保存到相册</span>
          </div>
          <div class="list-box">
            <p>2</p>
            <span v-if="activeTab=='wechant'">打开微信扫一扫，相册识别</span>
            <span v-else>打开支付宝扫一扫，相册识别</span>
          </div>
          <div class="list-box">
            <p>3</p>
            <span>进行支付确认</span>
          </div>
        </div>
      </div>
    </div>
    </Modal>
  </div>
  </div>
</template>

<script>
// import QRCode from 'qrcodejs2';//二维码生成插件
import { uploadUserInfo } from '@/utils/utils.js';
let btnCanClick = true;
export default {
  name: "pay",
  data() {
    return {
      activeGame: "",
      activeTab: 'alipay', //alipay为支付宝支付，wechant为微信支付
      showShopCar: false, //确认支付遮罩层
      price: null, //金额
      priceList: [
        { number: 100, id: 1 },
        { number: 200, id: 2 },
        { number: 500, id: 3 },
        { number: 1000, id: 4 },
        { number: 2000, id: 5 }
      ], //金额筛选的项
      show: false, //控制弹出数字键盘
      isFinish: false, //判断是否完成
      showCode: false,//控制二维码弹框
      codeUrl: '',//二维码地址
      orderNo: null,//订单号
    };
  },
  created() {
    this.$store.commit("setPageTitle", "充值");
  },
  mounted() {
    this.uploadUserInfo();
  },
  methods: {
    uploadUserInfo: uploadUserInfo,//获取用户详情
    //返回
    back() {
      window.history.back(-1); 
    },
    //选择支付方式
    changePay(num) {
      if (this.activeTab != num) {
        this.activeTab = num;
      }
    },
    //赋值要充值的金额
    assignment(item) {
      this.price = item.number;
    },
    //关闭充值弹框
    clearModel() {
      this.showShopCar = false;
      this.isFinish = false;
      this.uploadUserInfo();
    },
    //点击充值按钮
    sureBtn() {
      if (!!this.price) {
        if (parseFloat(this.price) <= 10000) {
          if (parseFloat(this.price) >= 100) {
            this.showShopCar = true;
            this.isFinish = false;
          } else {
            this.$Message.warning({
              duration: 2,
              forbidClick: true, // 禁用背景点击
              content: "输入金额不能小于100"
            });
          }
        } else {
          this.$Message.warning({
            duration: 2,
            forbidClick: true, // 禁用背景点击
            content: "输入金额不能大于10000"
          });

        }
      } else {
        this.$Message.warning({
          duration: 2,
          forbidClick: true, // 禁用背景点击
          content: "请输入充值金额"
        });
      }
    },
    //点击确认充值
    submit() {
      if (!btnCanClick) { return }
      let params = {
        token: this.$store.state.token,
        transferType: this.activeTab,//充值方式
        amount: parseFloat(this.price),//充值金额
      }
      btnCanClick = false;
      this.$http.post("orderInfo/recharge", params).then(res => {
        btnCanClick = true;
        if (res.retCode == "0") {
          this.codeUrl = res.data.codeUrl;
          this.orderNo = res.data.orderNo;
          this.showShopCar = false;
          this.isFinish = false;
          this.showCode = true;
        }
      });
    },
    //点击支付完成按钮
    successBtn() {
      if (!btnCanClick) { return }
      let params = {
        token: this.$store.state.token,
        orderNo: this.orderNo
      }
      btnCanClick = false;
      this.$http.post('orderInfo/paid', params).then(res => {
        btnCanClick = true;
        if (res.retCode == 0) {
          this.$Message.success({ duration: 2, content: "支付成功！" });
          this.$router.replace({ path: "/layout/home" });
        }
      })
    },
    //关闭二维码弹框
    clearCodeModel() {
      this.showCode = false;
      this.isFinish = true;
      this.showShopCar = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/color.scss";
.container {
  height: 100%;
  overflow-y: auto;
  .pay-type {
    .img-box {
      width: 215px;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 3px 3px 5px 3px;
      float: left;
      cursor: pointer;
      position: relative;
      overflow:hidden;
      
      i {
        background: url("../../assets/greensaojiao.png") no-repeat;
        background-size: 70px 48px;
        display: none;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 70px;
        height: 48px;
      }
    }
    .zfb-img {
      margin-right: 10px;
      background-color: #479ee3;
      img {
        height: 38px;
      }
    }
    .wx-img {
      background-color: #5ecc3e;
      img {
        height: 38px;
      }
    }
    .active {
      i {
        display: block;
      }
    }
  }
  .content-box {
    margin-top: 60px;
    .content-top {
      width: 100%;
      .content-top-l {
        color: $gray;
        font-size: 17px;
      }
      .content-top-r {
        color: $gray;
        font-size:17px;
      }
    }
    .content-body {
      margin-top: 30px;
      .input-box {
        width: 100%;
        background-color: #35333b;
        border-radius: 3px;
        input {
          padding-left: 28px;
          font-size: 29px;
          color: $gray;
          height: 93px;
        }
      }
      .price-list {
        margin-top: 25px;
        .price-box {
          width:86px;
          height: 50px;
          background-color: #35333b;
          border-radius: 3px;
          margin-right: 5px;
          line-height: 50px;
          text-align: center;
          font-size: 17px;
          color: $gray;
          cursor: pointer;
        }
        .price-box:last-child {
          margin-right: 0;
        }
      }
    }
  }
  .shop-car {
    height: 100vh;
    background: $opacity-dark;
    padding: 0 40px;
  }
 
  .prompt {
    color: $gray;
    font-size: 17px;
    margin-top: 28px;
    line-height: 32px;
  }
  
}
//弹框样式
 .model-box {
    padding: 20px;
    z-index: 20;
    p {
      color: $gray;
      font-size: 17px;
      text-align: center;
      margin-bottom: 40px;
    }
    .close-btn {
      position: absolute;
      top: 4px;
      right: 6px;
      display: block;
      color: #ffc444;
      font-size: 40px;
      cursor: pointer;
    }
    .model-text {
      margin-bottom: 15px;
      .model-label {
        font-size: 15px;
        color: $gray;
      }
      .model-price {
        color: #ffc444;
      }
    }
    .sure-big-btn {
      margin-top: 20px;
    }
    .btn-box {
      .btn {
        border: solid 2px #ffc444;
        width: 49%;
        line-height: 51px;
        margin-top: 15px;
      }
      .sure-btn {
      }
      .matter-btn {
        background-color: transparent;
        color: $gray;
      }
    }
  }
  //二维码弹框
  .codePop-box {
    z-index: 20;
    .top-box {
      color: $gray;
      padding: 10px 20px;
      background-color: #35333b;
      font-size: 15px;
      margin: 25px 0;
      margin-top: 0;
    }
    .top-text-box {
      background-color: #ffc444;
      position: relative;
      text-align: center;
      padding: 12px 0;
      span {
        color: #000;
        font-size: 16px;
      }
      i {
        display: block;
        position: absolute;
        left: 50%;
        bottom: -31px;
        transform: translate(-50%);
        border: 16px solid transparent;
        border-top: 16px solid #ffc444;
      }
    }
    .content-box {
      background-color: #35333b;
      margin-top: 16px;
      .price {
        color: #ff4200;
        font-size: 28px;
        text-align: center;
        padding: 12px 0;
      }
      .code-box {
        text-align: center;
        padding-bottom: 30px;
        img {
          width: 220px;
          height: 220px;
        }
      }
      .top-text-box {
        span {
          font-size: 17px;
        }
      }
      .term-box {
        padding-top: 20px;
        .list-box {
          padding-bottom: 13px;
          padding-left: 70px;
          p {
            width: 25px;
            height: 25px;
            background-color: #ffc444;
            border-radius: 6px;
            font-size: 17px;
            color: #000;
            line-height: 25px;
            text-align: center;
            display: inline-block;
            margin-bottom: 0;
          }
          span {
            padding-left: 10px;
            color: $gray;
            font-size: 15px;
          }
        }
      }
    }
    .close-box {
      position: absolute;
      right: -10px;
      top: -10px;
      width: 30px;
      height: 30px;
      background: url("../../assets/icon-close2.png") no-repeat;
      background-size: 100%;
      cursor: pointer;
    }
  }
</style>

<style lang="css" scoped>
.container >>> .van-overlay {
  z-index: 10;
}
.modal-showcode-common >>> .ivu-modal-body{
  padding:0;
}
</style>