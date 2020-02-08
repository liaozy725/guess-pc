<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./style/index.scss"; // 全局自定义的css···样式
@import "./style/iconfont/iconfont.css";
.top-item-box {
  margin-top: 10px;
  cursor: pointer;
  span {
    color: $gray;
    font-size: 17px;
  }
  i {
    font-size: 22px;
    margin-left: 10px;
    color: $gray;
  }
}
.box-pack {
  width: 450px;
  margin: 20px auto 0;
}
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

  /*iview-数字inputNumber样式*/
  .ivu-input-number {
    background-color: transparent;
    border: none;
    width: 100%;
    height: 68px;
    line-height: 68px;
  }
  .ivu-input-number-input-wrap {
    height: 68px;
  }
  .ivu-input-number:hover {
    border: none;
  }
  .ivu-input-number-focused {
    box-shadow: none;
  }
  .ivu-input-number-input {
    color: $gray;
    background-color: transparent;
    font-size: 17px;
    height: 68px;
    line-height: 68px;
  }
  .ivu-input-number-handler-wrap {
    display: none;
  }
}
//iview下拉样式
.ivu-select-single .ivu-select-selection,
.ivu-select .ivu-select-dropdown,
.ivu-select-dropdown .ivu-select-item {
  background-color: transparent;
  color: $gray;
}
.ivu-select .ivu-select-dropdown {
  background-color: $dark;
}
.ivu-select-dropdown .ivu-select-item:hover {
  background: $border-color;
  color: $gray;
}
//iview弹框样式更改
.ivu-modal {
  .ivu-modal-content {
    background-color: $dark;
    color: $gray;
  }
  .ivu-modal-confirm-head-title {
    color: $gray;
  }
  .ivu-modal-confirm-body {
    color: $gray;
  }
  .ivu-btn-text {
    color: $gray;
  }
  .ivu-btn-text:hover {
    background-color: transparent;
    color: $gray;
  }

  .ivu-btn-primary,
  .ivu-btn-primary:hover {
    background-color: $defaultYellow;
    border-color: transparent;
    color: $dark000;
  }
  .ivu-modal-header-inner {
    color: $gray;
  }
  .ivu-modal-close {
    .ivu-icon-ios-close:hover {
      color: $defaultYellow;
    }
  }
}

.no-footer {
}

// tabs
.ivu-tabs {
  .ivu-tabs-nav {
    display: flex;
    width: 100%;
    .ivu-tabs-tab {
      flex: 1;
      color: #fff;
      text-align: center;
    }
    .ivu-tabs-ink-bar {
      background: $yellow;
      height: 4px;
      border-radius: 2px;
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
  user-select:none;
  &.disabled {
    cursor: not-allowed;
  }
}
</style>
