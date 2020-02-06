<template>
  <div class="container">
    <div class="top-item-box" @click="back">
      <Icon type="md-arrow-back" />
      <span>返回</span>
    </div>
    <div class="box-pack">
      <Tabs v-model="active" @on-click="changeTab">
        <TabPane label="全部" name="0"></TabPane>
        <TabPane label="充值" name="1"></TabPane>
        <TabPane label="提现" name="2"></TabPane>
        <TabPane label="结算" name="3"></TabPane>
        <TabPane label="投注" name="4"></TabPane>
      </Tabs>

      <div class="list-box">
        <div class="list between" v-for="(item,i) in listData" :key="i">
          <div class="list-l">{{item.remark}}</div>
          <div class="list-c">{{item.createTime|parseTime}}</div>
          <div class="list-r" v-if="item.transactionStatus=='add'">+{{item.amount}}</div>
          <div class="list-r" v-if="item.transactionStatus=='sub'">-{{item.amount}}</div>
        </div>
        <p
          class="load-more" :class="finished&&'disabled'"
          @click="getList"
        >{{finished?'暂无更多数据':'点我加载更多'}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "stream",
  data() {
    return {
      active: "0",
      loading: false, //加载中
      finished: false, //没有更多数据
      pageNum: 0,
      pageSize: 20,
      listData: []
    };
  },
  created() {
    this.$store.commit("setPageTitle", "财务流水");
    this.getList();
  },
  mounted() {},
  methods: {
    //返回
    back() {
      window.history.back(-1);
    },
    //改变tab
    changeTab(val) {
      this.pageNum = 0;
      this.listData = [];
      this.finished = false;
      this.getList();
    },
    //获取数据
    getList() {
      if (this.finished) return;
      var params = {
        token: this.$store.state.token,
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        transactionType: this.active == "0" ? "" : this.active
      };
      this.loading = true;
      this.$http.post("userBalanceInfo/list", params).then(res => {
        if (res.retCode == 0) {
          this.listData = this.listData.concat(res.data);
          this.pageNum++;
          if (res.data.length < this.pageSize) {
            this.finished = true;
          }
        }
        this.loading = false;
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
  .list-box {
    padding: 0 10px;
    .list {
      height: 50px;
      align-items: center;
      border-bottom: 1px solid $border-color;
      .list-c {
        font-size: 14px;
      }
    }
    .list > div {
      color: $gray;
      font-size: 16px;
    }
  }
}
</style>

<style lang="css" scoped>
.van-tabs >>> .van-tabs__wrap--scrollable .van-tab {
  flex: 0 0 20% !important;
  flex-basis: 20% !important;
}
</style>