<template>
  <div class="layout">
    <div class="layout-header">
      <div class="layout-header-l">
        <router-link to="/jc/layout/home" class="header-box">
          <img src="../assets/games-a.png" alt="">
          <span>游戏大厅</span>
        </router-link>
        <router-link to="/layout/GuessRes" class="header-box" :class="$router.path=='/layout/GuessRes' && 'active'">
          <img src="../assets/icon-res.png" alt="">
          <span>赛果</span>
        </router-link>
      </div>
      <div class="layout-header-r">
        <div class="header-box" @click="showRule=true">
          <img src="../assets/icon-gz.png" alt="">
          <span>电竞规则</span>
        </div>
        <div class="header-box" @click="showUserMenu = !showUserMenu">
          <img src="../assets/icon-user.png" alt="">
          <span v-if="$store.state.userInfo">{{$store.state.userInfo.accountLogin}}</span>
          <span v-else>暂未登录</span>
        </div>
      </div>
    </div>
    <user-drawer :visible='showUserMenu' @close='()=>{showUserMenu=false}'></user-drawer>
    <router-view class="layout-view"></router-view>
    <Modal v-model="showRule" fullscreen title="电竞规则" cancel-text=''>
      <div class="rule">
        <div class="rule-box">
          <div class="rule-title">一般规则</div>
          <p>下列一般规则适用于所有赛事与赌盘／投注类型，在投注中须完全遵守。在适用的情况下，网站所公布的“条件与条款”中设定的规定和定义应适用于本“规则与规定”。</p>
        </div>
        <div class="rule-box">
          <div class="rule-title">一般事项</div>
          <p>1.本公司的所有投注信息都是出于诚意提供的。 不过，本公司不对有关日期、时间、地点、竞争对手、赔率、结果、统计数据、团队制服（显示在实时视频中）或其它投注信息的任何错误或遗漏负责。 本公司保留纠正任何明显错误的权利，并且应当采取所有合理行动确保以诚信透明的方式管理盘口，盘口定义为针对某一体育赛事所提供的不同的投注类型。 公司保留做出最终性决定的权利。</p>
          <p>2.如果一项赛事在预定时间之前开始，则只有该项赛事开始之前所做投注（除指定的现场投注以外）会被视为有效注码，赛事的定义是两个团队或个人间有组织的体育比赛或活动。 如果一个盘口未在正确时间关闭或中止，则本公司有权取消在实际开始时间之后进行的所有投注（除指定的现场投注以外）。</p>
          <p>3.如果网站对赛事所用的英语和非英语名称之间有任何差异，以英语版本为准</p>
          <p>4.在任何时候，客户有责任了解比赛分数和所有相关的比赛信息，并且建议客户在下注之前确认比赛状况。</p>
          <p>5.本公司有权在任何时候出于任何原因修改这些规则。一旦在网站上发布，任何此类修改都是具有约束性和立即生效的。</p>
          <p>6客户承认网站上提供的当前分数、所用时间及其它数据虽然是由第三方以“直播”形式提供，但仍会有时间延迟以及/或者可能不准确的情况，并且根据这些资料做任何投注时，客户应自行承担所有风险。 本公司提供这些数据时，不保证其准确性、完整性或及时性，并且不对客户因依赖这些数据而遭受的任何损失（直接或间接损失）负责</p>
        </div>
        <div class="rule-box">
          <div class="rule-title">比赛终止与延期</div>
          <p>1.如果一项赛事未在预定开始日期开始，并且未按特定体育规则的规定，在原先预定的完成日期完成，则所有的注码都将无效，除了对已获得无条件确定的盘口所做的投注以外。</p>
          <p>2.如果一项赛事已经开始，但之后又中止，并且未按特定体育规则的规定，在原先预定的完成日期完成，则所有的注码都将无效，除了对无条件决定结果的盘口所做的投注以外。</p>
          <p>3.如果一项赛事未按特定体育规则的规定，在原告预定的完成日期完成，而正式的比赛结果得以宣布，或者特定赛事的相关主管机构宣布了一个结果，则本公司有权认定这一比赛是正式有效的。 在此方面，本公司的决定是最终和具有结束性的。</p>
        </div>
        <div class="rule-box">
          <div class="rule-title">比赛结果</div>
          <p>1.必要时，颁奖仪式的位次将被视为是正式赛果，不论之后是否出现取消或更改赛果的情况。 如果没有颁奖仪式，赛果将会依据相关主管机构在盘口结算时提供的官方结果而定，不论之后是否出现取消或更改赛果的情况。 如果没有提供适用的官方结果，则将依据到盘口结算时适用且已知的证据来确定赛果。</p>
          <p>2.盘口通常会在一项赛事结束后不久尽快进行结算。 完全出于服务客户的目的，一些盘口可能会在正式结果公布之前结算。 如果一个盘口结算错误，本公司有权撤销结算</p>
          <p>3.如果对任何赛果有不确定，本公司有权无限期暂停任何盘口的结算。</p>
          <p>4.对于已经结算的注码，自赛事开始时间起的72个小时后，如赛果有任何修正或变更，本公司不会予以承认。</p>
          <p>5.当官方赛果与本公司网站赛果版块公布的赛果之间有冲突时，应当通过参考本公司的有关赛事视频记录来确定正确的结果，以便解决冲突。 然而，如果没有此类适用的视频记录，应当根据特定赛事的相关主管机构在其官方网站上公布的赛果确定正确的结果。 如果该官方网站无法提供这一结果或者官方网站公布的赛果明显有错，则本公司有权做出决定/修正，以便确定最终的结果。 在此方面，本公司的决定是最终和具有结束性的。</p>
        </div>
        <div class="rule-box">
          <div class="rule-title">比赛取消政策</div>
          <p>1.本公司网站上针对电子竞技赛事的开赛日期及时间仅作参考，不保证一定准确。如果某一比赛暂停或延期，而且未在实际确定的开赛时间之后一定时间内（该时间期限为线下比赛12小时，线上赛8小时）重新开始，则有关该场比赛的注单无效并予以退款。例外情况是，不管比赛是否暂停或延期，有关某一比赛队伍/选手锦标赛晋级或夺冠的注单始终有效。</p>
          <p>2.如果选手/战队的名称被拼错，所有下注金额仍有效，除非明显是错误的对象。如果在官方比赛中选手以错误的化名或低阶账户参赛，结果仍然有效。若存在参赛选手并非战队的官方选手（或其中之一），并未在公布赛程前公告参赛人员变动，本公司有权取消该场的注单并予以退款。</p>
          <p>3.所有的下注金额会根据相关比赛管理单位所公布的官方结果结算。如果没有打和的选项，那延长时间就会生效（若有）。</p>
          <p>4.当仅提供胜负选项的盘口遇到最终比赛结果为平局时（若有加时，则最后一个加时的结果视为最终比赛结果），则该盘口的所有注单无效并予以退款。</p>
          <p>5.本公司保留对比赛，盘口和注单的取消，退款政策的最终解释权。</p>
        </div>
        <div class="rule-box">
          <div class="rule-title">正确比分投注</div>
          <p>1.CS:GO的常规时间正确比分盘投注中，比分选项（例16：8，16：9等 ）仅代表常规时间内最终比分，加时赛的比分将不会对该盘口结果造成影响，若比赛进行到了加时赛，则常规时间的比分为15：15。</p>
          <p>2.常规时间正确比分盘并不区分双方队伍由哪一方获得胜利：</p>
          <p class="lizi">例1：Navi在常规时间内赢得14局，NIP赢得16局，则正确比分为16：14</p>
          <p class="lizi">例2：Navi在常规时间内赢得16局，NIP赢得14局，则正确比分也是16：14</p>
        </div>
        <div class="rule-box">
          <div class="rule-title">项目</div>
          <p>1.首塔： 第一只防御塔被毁的队伍，输掉本注</p>
          <p>2.首塔： 在比赛中宣布取得 First Blood的队伍赢得本注</p>
          <p>3.首小龙：在比赛中首先击杀小龙的队伍赢得本注</p>
          <p>4.首肉山：在比赛中首先击杀肉山的队伍赢得本注</p>
          <p>5.第一局：系列赛中的第一局来判定胜方</p>
          <p>6.系列赛：一系列的比赛是由(轮/比赛)组合来判定胜方。通常为三局两胜制(BO3)或五局三胜制(BO5)。</p>
          <p>7.游戏组合投注：单一注单里包含两种或以上的投注类型。例如:</p>
          <p class="lizi">第一局首杀+首塔: <br>首杀: A队赢 <br>首塔: B队赢 <br>成绩结果为0-0 <br> 在此情况下, 如投注于其中一队 (A队和B队) 投注者为输</p>
          <p>只有一队(A队或B队) 赢得两种投注类型为赢.例如: <br></p>
          <p class="lizi">首杀: A队赢<br>首塔: A队赢<br>成绩结果为A队赢, 玩家投注为赢</p>
          <p>8.BO3：三局两胜制，如果一方连胜两局，第三局不用进行。</p>
          <p>9.BO5：五局三胜制，如果一方连胜三局，第四及五局不用进行。</p>
          <p class="lizi">第一局A队胜,第二局B队胜,第三局A队胜,第四局A队胜。在此情况下，第五局不用进行，由于A队赢得系列赛。</p>
          <p>10.在 Dota2 和英雄联盟比赛中，任何杀死游戏中的小兵将会在积分榜进行分级。如一场5对5的比赛在开赛时小于10位选手，或一场6对6的比赛在开赛时小于12位选手，地图和系列赛的所有投注将会被取消。</p>
          <p>11.在 Dota2 和英雄联盟比赛中，如果选手在游戏进行期间中断连线且无法重新连线，或在剩下的游戏进行期间被更换，地图和系列赛的所有投注将会被取消。</p>
          <p>12.在 CSGO 比赛中，如果不到 10 位选手进行了至少 5 个回合，地图和系列赛的所有投注将会被取消。</p>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import userDrawer from '@/components/UserDrawer.vue';
export default {
  data() {
    return {
      showUserMenu: false,
      showCalendar: false,
      showRule: false
    }
  },
  created() {

  },
  components:{userDrawer},
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
@import "../style/color.scss";
.layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  .layout-header {
    height: 48px;
    background: $dark333;
    display: flex;
    > div {
      flex: 1;
      display: flex;
      align-items: center;
      .header-box {
        display: inline-block;
        padding: 0 45px;
        cursor: pointer;
        &:not(:first-child) {
          border-left: 2px solid #9e8558;
        }
        img {
          vertical-align: middle;
          margin-right: 20px;
        }
        span {
          color: $dark777;
          vertical-align: middle;
          font-size: 16px;
        }
      }
    }
    .layout-header-r {
      justify-content: flex-end;
    }
  }
  .layout-view {
    flex: 1;
    background: $dark000;
    overflow: auto;
  }
  
}
.rule{
  .rule-box{
    margin-bottom: 15px;
    .rule-title{
      color: $yellow;
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 5px;
    }
    p{
      font-size: 14px;
      color: $gray;
      margin-bottom: 4px;
    }
    .lizi{
      margin-left: 20px;
    }
  }
}
</style>