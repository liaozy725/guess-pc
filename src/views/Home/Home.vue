<template>
  <div class="home container">
    <ul class="game-list">
      <li class="game-item" :class="activeGame=='all'&&'active'" @click="changeActiveGame('all')">
        <img src="../../assets/all.png" alt="">
        <span>所有比赛</span>
        <i>{{total}}</i>
      </li>
      <li class="game-item" :class="activeGame==item.id&&'active'" v-for="(item,index) in gameList" :key='item.id' @click="changeActiveGame(item.id)">
        <img :src="item.gamePic" alt="">
        <span>{{item.gameName}}</span>
        <i>{{item.countNum}}</i>
      </li>
    </ul>
    <div class="guess-list">
      <ul class="guess-list-ul">
        <li v-for="(item,i) in guessList" @click="guessInfo(item)" :key="i" class="guess">
          <div class="guess-l">
            <img v-lazy="item.gamePic" alt="">
            <span class="time">{{item.matchTime | parseTime('{m}-{d}')}}<br />{{item.matchTime | parseTime('{h}:{i}')}}</span>
            <span v-if="item.number" class="number">BO{{item.number}}</span>
          </div>
          <div class="guess-center">
            <div class="team-box">
              <span class="team-name">{{item.homeListReps[0].gameTeamName}}</span>
              <img v-lazy='item.homeListReps[0].teamPic' alt="">
              <span class="price">{{item.homeListReps[0].oddsAmount}}</span>
            </div>
            <count-down class="daojishi" :endTime='item.matchTime+""' endText='比赛进行中'></count-down>
            <div class="team-box">
              <span class="price">{{item.homeListReps[1].oddsAmount}}</span>
              <img v-lazy='item.homeListReps[1].teamPic' alt="">
              <span class="team-name">{{item.homeListReps[1].gameTeamName}}</span>
            </div>
          </div>
          <div class="guess-r">
            <div>+{{item.countNum}}盘口</div>
          </div>
        </li>
      </ul>
      <p class="load-more" :class='finished&&"disabled"' @click="loadMore">{{finished?'暂无更多数据':'点我加载更多'}}</p>
    </div>
  </div>
</template>

<script>
import { uploadUserInfo } from "@/utils/utils.js";
import CountDown from '@/components/CountDown.vue';
export default {
  data() {
    return {
      activeGame: "all",
      playType: "",
      baseHeight: 0,
      fixedHeight: 0,
      isFixed: false,
      showPopup: false,
      bannerList: [], // banner
      gameList: [], // 游戏列表
      guessList: [], // 竞猜列表
      carData: [], // 购物车数据
      carDataIds: [], // 购物车id集合
      pageNum: 0,
      pageSize: 10,
      finished: false, //没有更多数据
      total:0
    }
  },
  created() {
    this.$store.commit("setPageTitle", "首页");
    this.getGameList();
    // this.getBannerList();
    if (this.$store.state.token) {
      this.uploadUserInfo();
    }
  },
  components: { CountDown },
  methods: {
    uploadUserInfo: uploadUserInfo,
    // 获取轮播图列表
    getBannerList() {
      this.$http.post("banner/list", {}).then(res => {
        if (res.retCode == 0) {
          this.bannerList = res.data;
        }
      });
    },
    // 获取游戏列表
    getGameList() {
      this.$http.post("home/gameList", {}).then(res => {
        if (res.retCode == 0) {
          this.gameList = res.data;
          this.gameList.forEach((ele)=>{
            this.total+=ele.countNum
          })
          this.getGuessList();
        }
      });
    },
    // 获取竞猜列表
    getGuessList() {
      let params = {
        gameId: this.activeGame == "all" ? "" : this.activeGame,
        playType: this.playType,
        pageSize: this.pageSize,
        pageNum: this.pageNum
      };
      this.$http.post("home/homeList", params).then(res => {
        if (res.retCode == 0) {
          if (res.retCode == 0) {
            this.guessList = this.guessList.concat(res.data);
            this.pageNum++;
            if (res.data.length < this.pageSize) {
              this.finished = true;
            }
          }
        }
      });
    },
    // 选择游戏
    changeActiveGame(name) {
      this.activeGame = name;
      this.pageNum = 0;
      this.guessList = [];
      this.getGuessList();
    },
    // 跳转到竞猜详情
    guessInfo(item) {
      this.$router.push({
        path: "/jc/layout/GuessDetail",
        query: {
          id: item.id
        }
      });
    },
    // 加载更多
    loadMore(){
      if(this.finished) return;
      this.getGuessList();
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/color.scss";
.home {
  display: flex;
  padding-top: 10px;
  .game-list {
    width: 210px;
    background: $dark333;
    height: 100%;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
    .game-item {
      display: flex;
      align-items: center;
      height: 50px;
      padding: 0 16px 0 10px;
      color: $brown;
      border-bottom: 1px solid $dark777;
      &.active {
        background: $dark111;
      }
      cursor: pointer;
      img {
        width: 26px;
        height: 26px;
        margin-right: 12px;
      }
      span {
        flex: 1;
      }
      i {
        font-style: normal;
      }
    }
    .guess-list {
      flex: 1;
    }
  }
  .guess-list {
    flex: 1;
    padding: 0 10px;
    height: 100%;
    overflow-y: auto;
    .guess {
      display: flex;
      height: 80px;
      align-items: center;
      background: $deepBlue;
      margin-bottom: 10px;
      padding: 10px;
      cursor: pointer;
      &:nth-child(2n + 1) {
        background: $deepRed;
      }
      .guess-l {
        width: 200px;
        display: flex;
        align-items: center;
        color: $darkfff;
        img {
          width: 54px;
          height: 54px;
          margin-right: 20px;
        }
        .time {
          font-size: 16px;
          color: $darkfff;
          margin-right: 30px;
          min-width: 42px;
        }
        .number {
          font-size: 16px;
        }
      }
      .guess-center {
        flex: 1;
        align-items: center;
        display: flex;
        padding: 0 20px;
        .team-box {
          flex: 1;
          display: flex;
          align-items: center;
          color: $fontColor;
          font-size: 20px;
          img {
            width: 46px;
            height: 46px;
            margin: 0 25px;
            border-radius: 4px;
          }
          &:last-child {
            justify-content: flex-end;
          }
          span {
            display: inline-block;
            width: 100px;
            text-align: center;
          }
          .price {
            color: $brown;
          }
        }
        .daojishi {
          display: inline-block;
          width: 100px;
          color: $darkfff;
          text-align: center;
        }
      }
      .guess-r {
        width: 200px;
        text-align: right;
        div {
          background: rgba(0, 0, 0, 0.5);
          width: 68px;
          height: 56px;
          line-height: 56px;
          text-align: center;
          color: $darkfff;
          border-radius: 4px;
          display: inline-block;
        }
      }
    }
    .load-more {
      text-align: center;
      background: $border-color;
      padding: 10px 0;
      border-radius: 4px;
      color: $darkfff;
      cursor: pointer;
      &.disabled {
        cursor: not-allowed;
      }
    }
  }
}
</style>