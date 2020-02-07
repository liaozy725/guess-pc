<template>
  <div class="container">
    <div class="top-item-box" @click="back">
      <Icon type="md-arrow-back" />
      <span>返回</span>
    </div>
    <div class="box-pack">
      <ul class="list-box">
        <li v-for="(item,index) in listData" :key="index">
          <p class="between">
            <span class="title">{{item.title}}</span>
            <span>{{item.createTime|parseTime}}</span>
          </p>
          <div
            class="content"
            :class="item.isShow&&'show'"
            @click="toggleShow(item)"
          >{{item.content}}</div>
        </li>
      </ul>
      <p class="load-more" :class="finished&&'disabled'" @click="getList">{{finished?'暂无更多数据':'点我加载更多'}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false, //加载中
      finished: false, //没有更多数据
      pageNum: 0,
      pageSize: 20,
      listData: []
    };
  },
  created() {
    this.$store.commit("setPageTitle", "系统消息");
    this.getList();
  },
  methods: {
    //返回
    back() {
      window.history.back(-1);
    },
    getList() {
      if(this.finished) return;
      var params = {
        token: this.$store.state.token,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      };
      this.loading = true;
      this.$http.post("sysNotice/list", params).then(res => {
        if (res.retCode == 0) {
          this.listData = this.listData.concat(res.data);
          this.pageNum++;
          if (res.data.length < this.pageSize) {
            this.finished = true;
          }
        }
        this.loading = false;
      });
    },
    // 显示内容详情
    toggleShow(item) {
      this.$set(item, "isShow", !item.isShow);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/color.scss";
.list-box {
  list-style: none;
  li {
    background-color: transparent !important;
    padding: 10px 15px;
    overflow: hidden;
    border-bottom: 1px solid $dark333;
  }

  span {
    font-size: 15px;
    color: #8a8791;
    &.title {
      font-size: 15px;
      color: #fff;
    }
  }
  .content {
    font-size: 15px;
    color: $gray;
    line-height: 20px;
    margin-top: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &.show {
      height: auto;
      text-overflow: clip;
      white-space: normal;
    }
  }
}
</style>
<style scoped>
.van-cell >>> .van-cell__title {
  display: block;
  flex: none;
  width: 100%;
}
.van-cell::after {
  right: 30px;
  left: 30px;
  border-color: #35333b;
}
</style>