<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./style/index.scss"; // 全局自定义的css···样式
@import "./style/iconfont/iconfont.css";

/* 样式自定义 */
#app {
  // input 样式
  .ivu-input-wrapper {
    .ivu-input {
      background: transparent;
      height: 48px;
      color: #fff;
    }
    .ivu-icon {
      color: #fff;
      line-height: 48px;
      font-size: 22px;
    }
  }
  .ivu-form-item-error {
    .ivu-input {
      border-color: #ffc444;
    }
  }
  .ivu-form-item-error-tip {
    padding-top: 2px;
    color: #ffc444;
    font-size: 12px;
  }
  .ivu-btn {
    background: #ffc444;
    line-height: 48px;
    height: 48px;
    color: #000000;
    font-size: 18px;
    border: 0;
  }
}
</style>
