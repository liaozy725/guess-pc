<template>
  <div class="home container">
    <ul class="game-list">
      <li class="game-item" :class="activeGame=='all'&&'active'" @click="changeActiveGame('all')">
        <img src="../../assets/all.png" alt="">
        <span>所有比赛</span>
        <i>000</i>
      </li>
      <li class="game-item" :class="activeGame==item.id&&'active'" v-for="(item,index) in gameList" :key='item.id' @click="changeActiveGame(item.id)">
        <img :src="item.gamePic" alt="">
        <span>{{item.gameName}}</span>
        <i>000</i>
      </li>
    </ul>
    <ul class="guess-list">
      <li v-for="(item,i) in guessList" @click="guessInfo(item)" :key="i" class="guess">
        <div class="guess-l">
          <img :src="item.gamePic" alt="">
          <span class="time">{{item.matchTime | parseTime('{m}-{d}')}}{{item.matchTime | parseTime('{h}:{i}')}}</span>
          <span v-if="item.number">BO{{item.number}}</span>
        </div>
        <div class="guess-center">
          <div class="team-box">
            <span class="team-name"></span>
          </div>
        </div>
        <div class="guess-r">
          +20盘口
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { uploadUserInfo } from "@/utils/utils.js";
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
      loading: false, //加载中
      finished: false //没有更多数据
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
      this.loading = true;
      this.$http.post("home/homeList", params).then(res => {
        if (res.retCode == 0) {
          if (res.retCode == 0) {
            this.guessList = this.guessList.concat(res.data);
            this.pageNum++;
            if (res.data.length < this.pageSize) {
              this.finished = true;
            }
          }
          this.loading = false;
        }
      });
    },
    // 选择游戏
    changeActiveGame(name){
      this.activeGame = name;
      this.pageNum = 0;
      this.guessList = [];
      this.getGuessList(); 
    },
    // 跳转到竞猜详情
    guessInfo(item) {
      this.$router.push({
        path: "/layout/GuessDetail",
        query: {
          id: item.id
        }
      });
    },
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
    &::-webkit-scrollbar{
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
      &.active{
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
    .guess-list{
      flex: 1;
    }
  }
}
</style>