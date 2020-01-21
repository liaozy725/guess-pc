<template>
  <div class="container">
    <div class="top-item-box" @click="back">
      <Icon type="md-arrow-back" /><span>返回</span>
    </div>
    <div class="box-pack">
      <router-link to="/layout/BankcardInfo">
        <div class="card-box between">
          <div class="card-box-l">
            <img src="../../assets/icon-card.png" alt />
            <span>查看我的银行卡</span>
          </div>
          <div class="card-box-r">
            <img src="../../assets/icon-down.png" alt />
          </div>
        </div>
      </router-link>
      <!-- 提现框 -->
      <div class="content-box">
        <div class="content-body content-t between">
          <!-- @click="bankcardModel=true" -->
          <div class="content-label">银行卡号：</div>
          <div class="card-num" v-if="!!bankInfo">
            {{ bankInfo.bankNo | getBankStr }}
          </div>
          <!-- <div class="img-box">
          <img src="../../assets/icon-down.png" alt="">
        </div>-->
        </div>
        <div class="content-body content-c">
          <p class="content-label">提现金额</p>
          <div class="content-c-input between">
            <InputNumber
              :max="100000"
              placeholder="请输入提现金额"
              :min="0"
              v-model="price"
            ></InputNumber>
            <!-- <van-field readonly clickable class="input-box" :value="price" placeholder="请输入提现金额" @touchstart.native.stop="show = true" /> -->
            <div class="img-box" @click="clearPrice">
              <img src="../../assets/icon-close2.png" alt />
            </div>
          </div>
        </div>
        <div class="content-body content-b between">
          <p class="content-label" v-if="userInfo">
            当前可提现金额 {{ userInfo.userBalance || 0 }}
          </p>

          <div class></div>
          <div class="btn" @click="allWithdraw">全部提现</div>
        </div>
      </div>
      <div class="explain-box">
        <p class="title-p">提现说明：</p>
        <p>1.最低金额50，最高金额100000</p>
        <p>2.正常状态下提现30分钟内到账</p>
      </div>
      <!-- 提现按钮 -->
      <div class="sure-big-btn" @click="sureBtn">提现</div>
      <!-- 支付确认弹框 -->
      <!-- <van-overlay :show="showShopCar" @click="clearModel" /> -->
      <Modal
        v-model="showShopCar"
        :closable="false"
        width="400"
        class="modal-common"
        footer-hide
      >
        <div class="model-box">
          <!-- <div class="title-box">支付</div>
      <div class="close-btn" @click="clearModel">×</div>-->
          <div class="model-text between">
            <div class="model-label">提现卡号：</div>
            <div class="model-label" v-if="!!bankInfo">
              {{ bankInfo.bankNo | getBankStr }}
            </div>
          </div>
          <div class="model-text between">
            <div class="model-label">提现金额：</div>
            <div class="model-label model-price">{{ parseFloat(price) }}</div>
          </div>
          <div class="model-text">
            <div class="model-label">支付密码：</div>
            <div class="password-box">
              <!-- 密码输入框 -->
              <input
                v-model="password"
                maxlength="6"
                type="password"
                placeholder="请输入支付密码"
              />
              <!-- <van-password-input :value="password" :length="6" :gutter="10" :focused="showKeyboard" @focus="showKeyboard = true" /> -->
            </div>
          </div>
          <div class="model-text">
            <div class="sure-big-btn" style="margin-top:20px;" @click="submit">
              确认提现
            </div>
          </div>
        </div>
      </Modal>

      <!-- 提现到银行卡选择弹框 -->
      <!-- <van-popup class="bankcard-model" v-model="bankcardModel" position="bottom" :style="{ height: '264px',backgroundColor: '#35333b', }">
      <div class="picker-box">
        <van-picker :columns="columns" @change="onChange" show-toolbar title="选择银行卡" @cancel="onCancel" @confirm="onConfirm" />
      </div>
    </van-popup> -->
    </div>
  </div>
</template>

<script>
import { uploadUserInfo } from "@/utils/utils.js";
export default {
  name: "withdraw",
  data() {
    return {
      activeGame: "",
      activeTab: 1, //1为支付宝支付，2为微信支付
      showShopCar: false, //遮罩层
      price: null, //金额
      show: false, //控制弹出数字键盘
      bankcardModel: false, //控制银行卡选择的弹框
      columns: [],
      password: "", //支付密码
      showKeyboard: false, //控制支付密码键盘
      bankInfo: null, //银行卡信息
      userInfo: this.$store.state.userInfo //用户信息
    };
  },
  created() {
    this.$store.commit("setPageTitle", "提现");
  },
  mounted() {
    this.getBankInfo(); //银行卡信息
  },
  watch: {
    // password(nVal, oVal) {
    //   if (nVal.length >= 6) {
    //     console.log(nVal);
    //     this.submit();
    //   }
    // }
  },
  methods: {
    uploadUserInfo: uploadUserInfo, //获取用户详情
    //返回
    back() {
      window.history.back(-1); 
    },
    //获取银行卡信息
    getBankInfo() {
      var params = {
        token: this.$store.state.token
      };
      this.$http.post("userBank/info", params).then(res => {
        if (res.retCode == 0) {
          if (!!res.data) {
            this.bankInfo = res.data;
            this.getPayPassword(); //判断是否存在支付密码
          } else {
            this.$Modal.confirm({
              title: "提示",
              content: "您暂未绑定银行卡",
              cancelText: "暂不提现",
              okText: "立即绑定",
              showConfirmButton: true,
              showCancelButton: true,
              onOk: () => {
                this.$router.push({ path: "/layout/BankcardEdit" });
              },
              onCancel: () => {
                this.$router.go(-1); //返回上一层
              }

              // confirmButtonColor: "#35333b"
            });
          }
        }
      });
    },
    //判断是否存在支付密码
    getPayPassword() {
      if (this.$store.state.userInfo.payPassword == "n") {
        //无支付密码
        this.$Modal.confirm({
          title: "提示",
          content: "您暂未设置支付密码",
          cancelText: "暂不提现",
          okText: "立即设置",
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonColor: "#35333b",
          onOk: () => {
            this.$router.push({ path: "/layout/ChangePayPwd" });
          },
          onCancel: () => {
            this.$router.go(-1); //返回上一层
          }
        });
      }
    },
    //清空金额
    clearPrice() {
      this.price = null;
    },
    //点击全部提现
    allWithdraw() {
      // if(this.userInfo.userBalance>0){

      // }
      if (this.userInfo && this.userInfo.userBalance) {
        this.price = this.userInfo.userBalance;
      } else {
        this.price = 0;
      }
    },
    //选择支付方式
    changePay(num) {
      if (this.activeTab != num) {
        this.activeTab = num;
      }
    },
    //筛选银行卡
    onChange(picker, value, index) {},
    //关闭选择银行卡弹框
    onCancel() {
      this.bankcardModel = false;
    },
    //点击确认选择银行卡
    onConfirm(value, index) {
      this.bankcardModel = false;
      // this.$Message(`当前值：${value}, 当前索引：${index}`);
    },
    //关闭提现弹框
    clearModel() {
      this.showShopCar = false;
    },
    //点击输入支付密码
    onInput(key) {
      this.password = (this.password + key).slice(0, 6);
    },
    //点击删除支付密码
    onDelete() {
      this.password = this.password.slice(0, this.password.length - 1);
    },
    //点击提现按钮
    sureBtn() {
      if (!!this.price) {
        if (parseFloat(this.price) <= 100000) {
          if (parseFloat(this.price) >= 50) {
            console.log(
              parseFloat(this.userInfo.userBalance),
              parseFloat(this.price)
            );
            if (
              parseFloat(this.userInfo.userBalance) >= parseFloat(this.price)
            ) {
              this.showShopCar = true;
            } else {
              this.$Message,
                warning({
                  duration: 2,
                  content: "提现金额不能大于可用余额"
                });
            }
          } else {
            this.$Message.warning({
              duration: 2,
              content: "输入金额不能小于50"
            });
          }
        } else {
          this.$Message.warning({
            duration: 2,
            content: "输入金额不能大于100000"
          });
        }
      } else {
        this.$Message.warning({
          duration: 2,
          content: "请输入提现金额"
        });
      }
    },
    //点击确认支付
    submit() {
      // let reg=/^[0-9]+$/g;
      // if(!reg.test(this.password)){//如果对的
      // this.$Message.warning({
      //   duration: 2,
      //   content: "输入金额不能大于100000"
      // });

      // }
      // return false;
      let params = {
        token: this.$store.state.token,
        payPassword: this.password, //支付密码
        amount: parseFloat(this.price), //提现额度
        type: this.$route.query.type == "prize" ? "prize" : "balance"
      };
      this.$http.post("userWithdrawDetail/save", params).then(res => {
        if (res.retCode == 0) {
          this.$Message.success({
            duration: 2,
            forbidClick: true, // 禁用背景点击
            content: "操作成功！"
          });
          this.showShopCar = false;
          this.showKeyboard = false;
          this.uploadUserInfo();
          this.$router.go(-1); //返回上一层
        } else {
          this.password = "";
        }
      });
    },
    //点击支付完成按钮
    successBtn() {
      this.$router.replace({ path: "/layout/home" });
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
  height: 100%;
  overflow-y: auto;

  .card-box {
    height: 68px;
    align-items: center;
    background-color: #35333b;
    border-radius: 5px;
    width: 100%;
    .card-box-l {
      img {
        width: 20px;
        vertical-align: middle;
      }
      span {
        color: $gray;
        font-size: 15px;
        margin-left: 70px;
        vertical-align: middle;
      }
    }
    .card-box-r {
      img {
        transform: rotate(-90deg);
        width: 14px;
      }
    }
  }
  .content-box {
    margin-top: 25px;
    padding: 0 40px;
    background-color: #35333b;
    border-radius: 5px;
    width: 100%;
    .content-body {
      border-bottom: 1px solid $gray;
      .content-label {
        color: $gray;
        font-size: 15px;
      }
    }
    .content-t {
      height: 68px;
      display: flex;
      align-items: center;
      .card-num {
        color: $gray;
        font-size: 15px;
      }
      .img-box {
        img {
          width: 25px;
        }
      }
    }
    .content-c {
      // height: 165px;
      p {
        margin-top: 36px;
      }
      .content-c-input {
        height: 68px;
        align-items: center;
        .input-box {
          width: 90%;
          padding-left: 0;

          input {
            font-size: 17px;
          }
        }
        .img-box {
          width: 10%;
          text-align: right;
          img {
            height: 19px;
            cursor: pointer;
          }
        }
      }
    }
    .content-b {
      border: none;
      height: 110px;
      align-items: center;
      .btn {
        width: 85px;
        height: 30px;
        background-color: $defaultYellow;
        border-radius: 5px;
        color: #000;
        line-height: 30px;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
  /*银行卡选择框样式*/
  .bankcard-model {
    background-color: #35333b;
    .picker-box {
      background-color: #35333b;
    }
  }
  .shop-car {
    height: 100vh;
    background: $opacity-dark;
    padding: 0 40px;
  }

  .explain-box {
    color: $gray;
    margin-top: 28px;
    line-height: 20px;
    p {
      font-size: 14px;
      color: $gray;
      margin-bottom: 10px;
    }
    .title-p {
      color: $gray;
      font-size: 15px;
    }
  }
}
.model-box {
  padding: 20px;
  z-index: 20;
  .title-box {
    color: $gray;
    font-size: 29px;
    text-align: center;
    margin-bottom: 40px;
  }
  p {
    color: $gray;
    font-size: 15px;
    text-align: center;
    margin-bottom: 40px;
  }
  .close-btn {
    position: absolute;
    top: 26px;
    right: 34px;
    display: block;
    color: $defaultYellow;
    font-size: 50px;
    font-weight: 300;
  }
  .model-text {
    margin-bottom: 15px;
    .model-label {
      font-size: 15px;
      color: $gray;
    }
    .model-price {
      color: $defaultYellow;
    }
    .password-box {
      margin-top: 10px;
      input {
        background-color: transparent;
        color: $gray;
        font-size: 15px;
        outline: none;
        height: 40px;
      }
    }
  }
  .model-text:nth-child(2) {
    border-bottom: 1px solid $border-color;
    padding-bottom: 40px;
  }
  .sure-big-btn {
    margin-top: 60px;
  }
}
</style>

<style lang="css" scoped>
.container >>> .van-overlay {
  z-index: 10;
}
.container >>> .van-cell:not(:last-child)::after {
  border: none;
}
.container >>> .van-field__control {
  font-size: 27px;
}
.container >>> .van-popup__close-icon {
  color: #d7d4de;
}
/* .modal-common >>> .ivu-input-wrapper,.modal-common >>>  .ivu-input{
  background-color: transparent;
  border: none;
  outline:none;
}
 .modal-common >>> .ivu-input:hover, .modal-common >>> .ivu-input:active {
    border: none !important;
            border-bottom: 1px solid #d2d2d2 !important;
            outline: none;
            box-shadow: none;
            width: 100%;
  }
.modal-common >>> .ivu-input-focused {
    box-shadow: none;
  } */
</style>
