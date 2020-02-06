<template>
  <div class="container">
    <div class="top-item-box" @click="back">
      <Icon type="md-arrow-back" />
      <span>返回</span>
    </div>
    <div class="box-pack">
      <div class="list-com">
        <div class="list-box">
          <div class="label-text">开户名称</div>
          <div class="label-content">
            <input type="text" v-model="bankUserName" @blur="windowScrollBack" placeholder="请输入姓名" />
          </div>
        </div>
        <div class="list-box">
          <div class="label-text">银行卡号</div>
          <div class="label-content">
            <input type="text" v-model="bankNo" @blur="windowScrollBack" placeholder="请输入银行卡号" />
          </div>
        </div>
        <div class="list-box">
          <div class="label-text">开户省份</div>
          <div class="label-content change-content">
            <Select v-model="provinceId" placeholder="请选择省份" @on-change="provinceChange">
              <Option
                v-for="(item, index) in provinceList"
                :value="item.id"
                :key="index"
              >{{ item.name }}</Option>
            </Select>
          </div>
        </div>
        <div class="list-box">
          <div class="label-text">开户城市</div>
          <div class="label-content change-content">
            <Select v-model="cityId" placeholder="请选择城市" @on-change="cityChange">
              <Option
                v-for="(item, index) in cityList"
                :value="item.id"
                :key="index"
              >{{ item.name }}</Option>
            </Select>
          </div>
        </div>
        <!-- @click="changeBank" -->
        <div class="list-box" >
          <div class="label-text">开户银行</div>
          <div class="label-content change-content">
            <!-- <div class="gray-text">请选择银行</div> -->
            <!-- <div class="gray-text check-text">工商银行</div> -->
            <input type="text" v-model="bankName" @blur="windowScrollBack" placeholder="请输入开户银行" />
            <div class="img-box">
            </div>
          </div>
        </div>
        <div class="list-box">
          <div class="label-text">开户支行</div>
          <div class="label-content">
            <input type="text" v-model="bankBranch" @blur="windowScrollBack" placeholder="请输入支行名称" />
          </div>
        </div>
      </div>
      <div class="sure-big-btn" v-if="!!$route.query.id" @click="edit">确认编辑</div>
      <div class="sure-big-btn" v-else @click="edit">确认绑定</div>
    </div>
  </div>
</template>

<script>
import { regNum } from "@/utils/utils.js";
export default {
  name: "BankcardInfo",
  data() {
    return {
      formData: {
        //数据
      },
      bankUserName: "", //开户名称
      bankNo: null, //银行卡号
      province: "", //省
      city: "", //城市
      bankName: "", //开户银行
      provinceId: 1, //省id
      cityId: null, //城市id
      bankId: null, //开户银行id
      bankBranch: "", //开户支行
      model3: false, //控制开户行弹框
      provinceList: [], //省列表
      cityList: [], //市列表
      bankList: [], //开户银行列表
    };
  },
  created() {
    if (!!this.$route.query.id) {
      this.$store.commit("setPageTitle", "编辑银行卡");
      this.getBankInfo();
    } else {
      this.$store.commit("setPageTitle", "绑定银行卡");
    }
  },
  mounted() {
  },
  methods: {
    // 键盘收起，页面回弹
    windowScrollBack() {
      window.scrollTo(0, 0);
    },
    // 限制输入英文 数字
    onInputChange(key) {
      this.key = this.key.replace(/[^0-9]+/g, "");
    },
    // 省份改变
    provinceChange(row) {
      this.provinceList.map((val, i) => {
        if (val.id == row) {
          this.province = val.name;
        }
      });
      console.log(this.province, "325346");
      this.getArea(this.provinceId, 2);
    },
    //市改变
    cityChange(row) {
      console.log(row, "325346");
      this.cityList.map((val, i) => {
        if (val.id == row) {
          this.city = val.name;
        }
      });
    },
    //获取银行卡信息
    getBankInfo() {
      var params = {
        token: this.$store.state.token
      };
      this.$http.post("userBank/info", params).then(res => {
        if (res.retCode == 0) {
          if (!!res.data) {
            this.bankName = res.data.bankName; //银行名称
            this.bankUserName = res.data.bankUserName; //开户用户
            this.bankNo = res.data.bankNo; //银行卡
            this.province = res.data.bankProvince; //省
            this.city = res.data.bankCity; //城市
            this.bankBranch = res.data.bankBranch; //开户支行
          }
          this.getArea(1, 1);
        }
      });
    },

    //获取省、市地区数据
    getArea(parentId, type) {
      //type为1：省，为2：市
      var params = {
        parentId: parentId
      };
      this.$http.post("area/list", params).then(res => {
        if (res.retCode == 0) {
          if (type == 1) {
            //省数据
            this.provinceList = res.data;
            if (!!this.$route.query.id) {
              //编辑回填
              res.data.map((val, i) => {
                if (val.name == this.province) {
                  this.provinceId = val.id;
                  this.getArea(this.provinceId, 2);
                }
              });
            }
          } else if (type == 2) {
            //市数据
            this.cityList = res.data;
            if (!!this.$route.query.id) {
              //编辑回填
              res.data.map((val, i) => {
                if (val.name == this.city) {
                  // this.cityIndex = i;
                  this.cityId = val.id;
                }
              });
            }
          }
        }
      });
    },
    //点击确认编辑，绑定
    edit() {
      if (!this.bankUserName) {
        return this.$Message.warning({
          duration: 2,
          content: "请输入正确的开户名称"
        });
      }
      if (!regNum(this.bankNo)) {
        return this.$Message.warning({
          duration: 2,
          content: "请输入正确的银行卡号"
        });
      }
      if (!this.provinceId) {
        return this.$Message.warning({
          duration: 2,
          content: "请输入正确的省份"
        });
      }
      if (!this.cityId) {
        return this.$Message.warning({
          duration: 2,
          content: "请输入正确的城市"
        });
      }
      if (!this.bankName) {
        return this.$Message.warning({
          duration: 2,
          content: "请输入正确的开户银行"
        });
      }
      if (!this.bankBranch) {
        return this.$Message.warning({
          duration: 2,
          content: "请输入正确的开户支行"
        });
      }
      let params = {
        token: this.$store.state.token,
        bankUserName: this.bankUserName, //开户名称
        bankNo: this.bankNo, //账户卡号
        bankName: this.bankName, //开户银行
        bankProvince: this.province, //省
        bankCity: this.city, //市
        bankBranch: this.bankBranch //开户支行
      };
      this.$http.post("userBank/saveOrUpdate", params).then(res => {
        if (res.retCode == 0) {
          this.$Message.success({
            duration: 2,
            content: "操作成功！"
          });
          this.$router.go(-1); //返回上一层
        }
      });
    },
    //确认省的弹框
    onConfirmModel1(value, index) {
      this.provinceIndex = index;
      this.cityList = [];
      this.city = "";
      this.cityIndex = -1;
      this.province = value.name;
      this.provinceId = value.id;
      this.getArea(this.provinceId, 2);
      this.model1 = false;
    },
    //点击开户银行
    changeBank() {
      this.model3 = true;
    },
    //取消开户银行的弹框
    onCancelModel3() {
      this.model3 = false;
    },
    //确认开户银行的弹框
    onConfirmModel3(value, index) {
      this.model3 = false;
    },
    back() {
      window.history.back(-1); 
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
  .list-com {
    padding: 0 40px;
    background-color: #35333b;
    border-radius: 5px;
  }
  .list-box {
    // height: 100px;
    display: flex;
    border-bottom: 1px solid $gray;
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
      // overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
      input {
        width: 100%;
        font-size: 15px;
        background-color: transparent;
        outline: none;
        color: $gray;
      }
      .gray-text,
      .check-text {
        font-size: 15px;
        color: #777;
      }
      .check-text {
        color: $gray;
      }
    }
    .change-content {
      .gray-text {
        display: inline-block;
      }
      .img-box {
        float: right;
        width: 25px;
        height: 100px;
        line-height: 100px;
        display: flex;
        align-items: center;
        img {
          width: 25px;
        }
      }
    }
  }
  .list-box:last-child {
    border: none;
  }
  .sure-big-btn {
    margin-top: 80px;
  }
}
</style>

<style lang="css" scoped></style>
