<template>
  <div class="guess-detail">
    <header class="guess-header">
      <div class="header-l">
        <img v-lazy='guessData.gamePic' alt="">
        <span class="time">{{guessData.matchTime | parseTime('{y}/{m}/{d} {h}:{i}')}}</span>
        <count-down v-if="guessData.matchTime" :endTime='guessData.matchTime+""' endText='比赛进行中'></count-down>
      </div>
      <div class="header-center" v-if="guessData.team && guessData.team.length >=2">
        <div class="team">
          <span>{{guessData.team[0].teamName}}</span>
          <img v-lazy="guessData.team[0].teamPic" alt="">
        </div>
        <img src="../../assets/vs.png" alt="" class="vs">
        <div class="team">
          <img v-lazy="guessData.team[1].teamPic" alt="">
          <span>{{guessData.team[1].teamName}}</span>
        </div>
      </div>
      <div class="header-r" @click="showUserMenu=true">
        <img src="../../assets/icon-user.png" alt="">
        <span v-if="$store.state.userInfo">{{$store.state.userInfo.accountLogin}}</span>
        <span v-else>暂未登录</span>
      </div>
    </header>
    <div class="guess-main">
      <div class="guess-l">
        <ul>
          <li class="box-1" v-for="(item,index) in guessData.guessInfoListReps" :key="index">
            <div class="box-title">
              <span>{{item.number>0?'第'+ item.number + '局' : '系列赛'}}</span>
              <span>
                <Icon type="md-arrow-dropdown" />
              </span>
            </div>
          </li>
        </ul>
      </div>
      <div class="guess-r">

      </div>
    </div>

    <!-- 用户中心 -->
    <user-drawer :visible='showUserMenu' @close='()=>{showUserMenu=false}'></user-drawer>
  </div>
</template>

<script>
import CountDown from '@/components/CountDown.vue';
import UserDrawer from '@/components/UserDrawer.vue';
export default {
  data() {
    return {
      showUserMenu: false,
      showPopup: false,
      activeTab: parseInt(this.$route.query.number) || 'all',
      id: this.$route.query.id,
      guessId: this.$route.query.id,
      guessData: {},
      carData: []
    };
  },
  created() {
    this.getGuessDetail();
  },
  components: { CountDown, UserDrawer },
  methods: {
    // 获取竞猜详情
    getGuessDetail() {
      let params = {
        guessId: this.guessId,
        // number: this.activeTab == 'all' ? '' : this.activeTab
      }
      this.$http.post('home/guessInfoList', params).then(res => {
        if (res.retCode == 0) {
          try {
            res.data.team = JSON.parse(res.data.team)
          } catch (error) {

          }
          this.guessData = res.data;
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/color.scss";
.guess-detail {
  .guess-header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 52px;
    background: $dark333;
    z-index: 98;
    display: flex;
    padding: 0 10px;
    align-items: center;
    color: $darkfff;
    .header-l,
    .header-r {
      width: 25%;
    }
    .header-l {
      font-size: 16px;
      img {
        width: 30px;
        height: 30px;
        border-radius: 2px;
        margin-right: 14px;
        vertical-align: middle;
      }
      .time {
        margin-right: 14px;
        font-size: 14px;
      }
    }
    .header-center {
      flex: 1;
      text-align: center;
      display: flex;
      align-items: center;
      background: url(../../assets/vs-bg.png) no-repeat;
      background-size: 100% 100%;
      height: 100%;
      .team {
        flex: 1;
        text-align: center;
        img {
          width: 30px;
          height: 30px;
          vertical-align: middle;
          margin: 0 20px;
          border-radius: 50%;
        }
        span {
          font-size: 22px;
          vertical-align: middle;
          margin: 0 20px;
        }
      }
      .vs {
        width: 44px;
        height: 22px;
      }
    }
    .header-r {
      text-align: right;
      font-size: 16px;
      cursor: pointer;
      img {
        vertical-align: middle;
        margin-right: 10px;
      }
      span {
        vertical-align: middle;
      }
    }
  }
  .guess-main {
    height: 100%;
    padding: 10px;
    display: flex;
    .guess-l,
    .guess-r {
      flex: 1;
      height: 100%;
      overflow: auto;
    }
    .guess-l {
    }
  }
}
</style>