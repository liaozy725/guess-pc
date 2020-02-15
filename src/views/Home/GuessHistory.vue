<template>
  <div class="container guess-history">
    <div class="top-item-box" @click="back">
      <Icon type="md-arrow-back" />
      <span>返回</span>
    </div>
    <div class="box-pack">
      <Tabs class="tabs" v-model="activeTab" :border="false" @on-click="changeTab">
        <TabPane label="未结算" name="2"></TabPane>
        <TabPane label="已结算" name="1"></TabPane>
      </Tabs>
      <!-- <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList"> -->
      <ul class="guess-list">
        <li v-for="(item,index) in listData" :key="index">
          <div class="list-tit">
            <img :src="item.gamePic" alt class="tit-logo" />
            <span>{{item.title}}</span>
            <span class="more-res" v-if="item.matchResult==1" @click="moreRes(item)">更多赛果</span>
          </div>
          <div class="list-main">
            <div class="time">
              <div>
                <span>{{item.matchTime | parseTime('{m}-{d}')}}</span>
                <span>{{item.matchTime | parseTime('{h}:{i}')}}</span>
              </div>
            </div>
            <div class="main-r">
              <div
                v-for="(row,i) in item.userBettingListInfoReps"
                :key="i"
                :class="row.isBetting == 'y' && 'betting'"
              >
                <div class="team">
                  <img :src="row.teamPic" alt />
                  <span>{{row.gameTeamName}}</span>
                  <img v-if="row.isWin=='win'" src="../../assets/win.png" alt class="win" />
                </div>
                <span class="num">{{row.odds}}</span>
              </div>
            </div>
          </div>
          <div class="list-footer between">
            <span>投注 {{item.number}}</span>
            <span>返还 {{item.returnNumber}}</span>
          </div>
        </li>
      </ul>
      <p class="load-more" :class="finished&&'disabled'" @click="getList">{{finished?'暂无更多数据':'点我加载更多'}}</p>
      <!-- </van-list> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "GuessHistory",
  data() {
    return {
      activeTab: '2',
      loading: false, //加载中
      finished: false, //没有更多数据
      pageNum: 0,
      pageSize: 10,
      listData: []
    };
  },
  created() {
    this.$store.commit("setPageTitle", "投注历史");
    this.getList();
  },
  methods: {
    //返回
    back() {
      window.history.back(-1);
    },
    // 获取投注历史
    getList() {
      if(this.finished) return;
      let params = {
        token: this.$store.state.token,
        matchResult: this.activeTab
      };
      this.loading = true;
      this.$http.post("home/userBettingList", params).then(res => {
        if (res.retCode == 0) {
          this.listData = this.listData.concat(res.data);
          this.loading = false;
          if (res.data.length < this.pageSize) {
            this.finished = true;
          }
        }
      });
    },
    // 改变标签
    changeTab() {
      this.pageNum = 0;
      this.finished = false;
      this.listData = [];
      this.getList();
    },
    // 更多赛果
    moreRes(item) {
      this.$router.push({
        path: "/jc/layout/GuessResDetail",
        query: {
          type: "guessRes",
          id: item.guessId
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/color.scss";
.container {
  .guess-list {
    padding: 0px 12px 0;
    li {
      margin-bottom: 16px;
      border-radius: 3px;
      overflow: hidden;
      .list-tit {
        background: $yellow;
        padding: 0 6px;
        height: 26px;
        display: flex;
        align-items: center;
        img {
          height: 14px;
          margin-right: 9px;
        }
        span {
          font-size: 14px;
          color: #000;
          flex: 1;
        }
        .more-res {
          text-align: right;
          flex: none;
          height: 26px;
          line-height: 26px;
          float: right;
        }
      }
      .list-main {
        display: flex;
        background-color: #443921;
        .time {
          width: 54px;
          text-align: center;
          border-right: 1px solid #8b6c2b;
          padding-top: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          span {
            font-size: 14px;
            color: #fff1d3;
            display: block;
            margin-bottom: 10px;
          }
        }
        .main-r {
          flex: 1;
          > div {
            height: 37px;
            display: flex;
            align-items: center;
            padding-left: 12px;
            img {
              height: 20px;
              width: 20px;
              vertical-align: middle;
              margin-right: 10px;
            }
            span {
              font-size: 16px;
              color: #fff1d3;
              vertical-align: middle;
            }
            .win {
              height: 10px;
              float: right;
              vertical-align: middle;
              margin-top: 4px;
            }
            .team {
              flex: 1;
            }
            .num {
              width: 100px;
              text-align: center;
              height: 100%;
              line-height: 37px;
            }
            &:not(:first-child) {
              border-top: 1px solid #8b6c2b /*no*/;
            }
            &.betting {
              background: #8b6c2b;
            }
          }
        }
      }
      .list-footer {
        background: $yellow;
        padding: 0 12px;
        span {
          font-size: 14px;
          color: $black;
          line-height: 28px;
        }
      }
    }
  }
}
</style>
<style scoped>
</style>