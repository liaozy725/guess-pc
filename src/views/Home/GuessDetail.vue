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
        <Collapse v-model="activeTab" accordion>
          <Panel v-for="(row,idx) in guessList" :key="idx" :name="idx+''" class="guess-panel">
            <span class="box-title">
              {{idx>0?'第'+idx+'局':'系列赛'}}
            </span>
            <span class="box-title-r">{{row.length}}</span>
            <ul slot="content">
              <li class="guess-row2" v-for="(row2,idx2) in row">
                <div class="guess-row2-flex">
                  <div class="guess-row3 guess-row3-l" @click="showSubmitBoxFn(row2,row2.listReps[0],1)">
                    <span class="team-odds">{{row2.listReps[0].oddsAmount}}</span>
                    <span class="team-name">{{row2.listReps[0].gameTeamName}}</span>
                    <img class="team-pic" v-lazy="row2.listReps[0].teamPic" alt="">
                    <img src="../../assets/jt-blue.png" alt="" class="jt">
                  </div>
                  <span class="guess-row3-center">{{row2.title}}</span>
                  <div class="guess-row3 guess-row3-r" @click="showSubmitBoxFn(row2,row2.listReps[1],2)">
                    <img src="../../assets/jt-red.png" alt="" class="jt">
                    <img class="team-pic" v-lazy="row2.listReps[1].teamPic" alt="">
                    <span class="team-name">{{row2.listReps[1].gameTeamName}}</span>
                    <span class="team-odds">{{row2.listReps[1].oddsAmount}}</span>
                  </div>
                </div>
                <div class="guess-row2-submit" v-if="row2.showSubmitBox">
                  <div class="submit-box-title">
                    <label>赔率</label>
                    <span>{{row2.selectTeam.oddsAmount}}</span>
                  </div>
                  <div class="submit-box-center">
                    <label>下注金额(RMB)</label>
                    <Input v-model="row2.selectTeam.num" type="number"/>
                  </div>
                  <div class="submit-box-bottom">
                    <label>预计返还(RMB)</label>
                    <span class="fanhuan">{{(row2.selectTeam.num*row2.selectTeam.oddsAmount).toFixed(2)}}</span>
                    <Button class="submit-btn" @click="confirmBets(row2)">确认下注</Button>
                  </div>
                  <div class="border-top" :class="'border-top-'+row2.selectType"></div>
                </div>
              </li>
            </ul>
          </Panel>
        </Collapse>
      </div>
      <div class="guess-r">
        <div class="right-top">
          <div class="guess-infos" v-if="!guessData.url">
            <div class="guess-infos-cover" v-if="teamList.length>1">
              <div class="guess-info-l">
                <img :src="teamList[0].teamPic" alt="">
                <p>{{teamList[0].teamName}}</p>
              </div>
              <div class="guess-info-c">
                <p class="info-tit">{{guessData.matchName}}</p>
                <img src="../../assets/vs-yellow.png" alt="" class="vs">
                <p class="time">{{guessData.matchTime | parseTime('{y}/{m}/{d} {h}:{i}')}}</p>
              </div>
              <div class="guess-info-r">
                <img :src="teamList[1].teamPic" alt="">
                <p>{{teamList[1].teamName}}</p>
              </div>
            </div>
          </div>
          <iframe :src="guessData.url" frameborder="0" style="width:100%;height:100%;"></iframe>
        </div>
        <div class="right-bottom"></div>
      </div>
    </div>

    <!-- 用户中心 -->
    <user-drawer :visible='showUserMenu' @close='()=>{showUserMenu=false}'></user-drawer>
  </div>
</template>

<script>
import CountDown from '@/components/CountDown.vue';
import UserDrawer from '@/components/UserDrawer.vue';
import { log } from 'util';
export default {
  data() {
    return {
      showUserMenu: false,
      showPopup: false,
      btnCanClick: true,
      activeTab: this.$route.query.number ? [this.$route.query.number] : [0],
      id: this.$route.query.id,
      guessId: this.$route.query.id,
      guessData: {},
      guessList:[],
      carData: [],
      teamList:[]
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
        number: this.activeTab[0] == 0 ? '' : this.activeTab[0]
      }
      this.$http.post('home/guessInfoList', params).then(res => {
        if (res.retCode == 0) {
          try {
            res.data.team = JSON.parse(res.data.team)
          } catch (error) {

          }
          res.data.guessInfoListReps.forEach(ele => {
            if(!this.guessList[ele.number]){
              this.guessList[ele.number] = [];
            }
            this.guessList[ele.number].push(ele);
          });
          this.guessData = res.data;
          this.teamList = res.data.team;
        }
      })
    },
    // 点击展开下注
    showSubmitBoxFn(row2,team,type){
      if(!(row2.showSubmitBox && row2.selectTeam.gameTeamId != team.gameTeamId)){
        this.$set(row2,'showSubmitBox',!row2.showSubmitBox);
      }
      this.$set(team,'num',0);
      this.$set(row2,'selectTeam',team);
      this.$set(row2,'selectType',type);
    },
    // 确认下注
    confirmBets(row2){
      let _this = this;
      if(!this.btnCanClick) return;
      if(!this.$store.state.userInfo){
        return this.$Modal.confirm({
          title:'提示',
          content:'您暂未登录，请先登录',
          okText:'立即登录',
          cancelText:'取消',
          onOk(){
            _this.$router.replace('/login')
          }
        })
      }else if(row2.selectTeam.num<=0){
        return this.$Message.warning('请输入下注金额')
      }
      this.btnCanClick = false;
      let params = {
        token: this.$store.state.token,
        guessIds: this.guessId+'',
        guessInfoIds: row2.selectTeam.guessInfoId + '',
        gameTeamIds: row2.selectTeam.gameTeamId + '',
        numbers: row2.selectTeam.num,
        bettings: (row2.selectTeam.num * row2.selectTeam.oddsAmount).toFixed(2)
      }
      this.$http.post('home/userBetting',params).then(res=>{
        this.btnCanClick = true;
        if(res.retCode == 0){
          this.$Message.success('下单成功');
          row2.selectTeam.num = 0;
          row2.showSubmitBox = false;
        }else if(res.errorMsg.includes('余额不足')){
          this.$Modal.confirm({
            title:'提示',
            content:res.errorMsg,
            okText: '前往充值',
            onOk(){
              _this.$router.push('/layout/pay')
            }
          })
        }
      })
    }
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
      margin-right: 10px;
      /deep/.ivu-collapse{
        border: 0;
      }
      /deep/.guess-panel{
        background-image: linear-gradient(90deg,$deepBlue,$deepRed);
        .ivu-collapse-header{
          color: #fff;
          .box-title-r{
            float: right;
            padding-right: 20px;
          }
        }
        .ivu-collapse-content{
          background: transparent;
          border-bottom: 10px solid $dark000;
          padding: 0;
        }
        .ivu-collapse-content-box{
          padding: 0;
        }
        .guess-row2{
          border-top: 2px solid;
          border-image: linear-gradient(90deg,$blue,$red) 100 0;
          color: #fff;
          &:first-child{
          border: 0;
          }
          .guess-row2-flex{
            display: flex;
            align-items: center;
          }
          .guess-row3{
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            user-select: none;
            .team-pic{
              width: 40px;
              height: 40px;
              border-radius: 50%;
              margin:0 10px;
            }
            .team-odds{
              background: $blue;
              height: 60px;
              line-height: 60px;
              width: 80px;
              text-align: center;
            }
            .team-name{
              flex: 1;
              font-size: 16px;
              text-align: center;
            }
          }
          .guess-row3-r{
            text-align: right;
            .team-odds{
              background: $red;
            }
          }
          .guess-row3-center{
            width: 160px;
            text-align: center;
            font-weight: bold;
          }
        }
        .guess-row2-submit{
          position: relative;
          padding: 0 15px;
          >div{
            display: flex;
            align-items: center;
            justify-content: right;
            padding: 4px 0;
            label{
              width: 140px;
              line-height: 40px;
            }
            span{
              flex: 1;
              text-align: right;
            }
            .fanhuan{
              text-align: left;
            }
            .ivu-input-wrapper{
              flex: 1;
            }
            .submit-btn{
              height: 36px !important;
              line-height: 36px !important;
              background: rgba($color: #fff, $alpha: 0.2) !important;
              color: #fff !important;
              font-size: 16px !important;
              border: 1px solid #fff !important;
            }
            &.submit-box-bottom{
              border-top: 1px solid rgba($color: #fff, $alpha: 0.2);
              margin-top: 10px;
              padding-top: 10px;
              padding-bottom: 10px;
            }
          }
          .border-top{
            position: absolute;
            top: 0;
            height: 2px;
            padding: 0;
            width: 50%;
            transition:all ease-in-out 0.15s;
            &.border-top-1{
              background: $red;
              left: 50%;
            }
            &.border-top-2{
              background: $blue;
              left: 0;
            }
          }
        }
      }
    }
    .guess-r{
      // display: flex;
      // flex-direction: column;
      overflow: hidden;
      .right-top{
        height: 50%;
        background: url(../../assets/login-bg.jpg) no-repeat;
        background-size: 100% 100%;
        .guess-infos{
          display: flex;
          height: 100%;
          align-items: center;
          background: rgba($color: #000, $alpha: 0.5);
          .guess-infos-cover{
            display: flex;
            width: 100%;
            color: #fff;
            background: linear-gradient(90deg,$deepBlue,$deepRed);
            padding: 40px 0;
            .guess-info-l,.guess-info-r{
              flex: 1;
              text-align: center;
              img{
                width: 80px;
                height: 80px;
                border-radius: 50%;
              }
            }
            .guess-info-c{
              text-align: center;
              padding-top: 10px;
              .vs{
                margin: 10px 0;
              }
            }
          }
        }
        
      }
      .right-bottom{
        flex: 1;
      }
    }
  }
}
</style>