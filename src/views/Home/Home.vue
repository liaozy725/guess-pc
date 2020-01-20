<template>
  
</template>

<script>
import { uploadUserInfo } from "@/utils/utils.js";
export default {
  data(){
    return{
      activeGame: "",
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
    this.getBannerList();
    // this.getGuessList();
    if (this.$store.state.token) {
      this.uploadUserInfo();
    }
  },
  methods:{
    uploadUserInfo: uploadUserInfo,
  }
}
</script>

<style lang="scss" scoped>

</style>