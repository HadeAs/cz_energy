<!--
 * @Author: ymZhang
 * @Date: 2023-12-23 19:10:40
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-23 20:00:50
 * @Description: 
-->
<template>
  <div ref="pageContainer" class="page-container">
    <div class="cs-main-header">
      <span class="cs-header-info"></span>
      <div class="cs-left-header">
        <span class="cs-left-text1"><img src="@/assets/img/screen/u196.png" />{{ state.city }}</span>
        <span class="cs-left-text2"><img src="@/assets/img/screen/weather1.png" />{{
          state.degree
        }}℃</span>
      </div>
      <div class="cs-right-header">
        <IntervalTime />
        <span class="cs-right-text2"><img src="@/assets/img/screen/u1684.png" />{{ state.role }}</span>
        <span class="cs-quit"><img src="@/assets/img/screen/u2156.png" /></span>
      </div>
    </div>
    <div class="cs-main-content">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts" setup name="ScreenLayout">
import { reactive, ref, onMounted } from "vue";
// import { useResizeObserver } from '@vueuse/core'
import IntervalTime from "./components/intervalTime.vue";

const pageContainer = ref();
const scaleX = ref(1);
const scaleY = ref(1);
const state = reactive({
  city: "常州",
  degree: 30,
  role: "管理员",
});

// useResizeObserver(pageContainer, () => {
//   var ratioX = window.innerWidth / 1920;
//   scaleX.value = ratioX;
//   scaleY.value = ratioX;
// })
const getRate = () => {
  var ratioX = window.innerWidth / 1920;
  scaleX.value = ratioX;
  scaleY.value = ratioX;
}
window.onresize = () => {
  getRate();
}
onMounted(() => {
  getRate()
})
</script>
<style lang="scss">
body {
  margin: 0;
  font-family: Arial, "Microsoft YaHei", "微软雅黑", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", sans-serif;
  font-size: 14px;
  line-height: 1.618;
  color: #6ed7fe;
  background-color: #050b1b;
}

*,
:after,
:before {
  box-sizing: border-box;
}

img {
  border: 0;
  vertical-align: middle;
}

p {
  margin: 0 0 12px;
}

ul {
  list-style: none;
  padding: 0;
  // margin: 0;
  margin-top: 0;
}

.text-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pull-right {
  float: right;
}

.margin-left-large-4 {
  margin-left: 48px;
}

.margin-right-base {
  margin-right: 16px;
}

.el-button.btn {
  color: #b4feff;
  background-color: transparent;
  background-image: linear-gradient(to bottom, rgba(0, 249, 255, .6) 0, rgba(0, 249, 255, .2) 100%);
  background-repeat: repeat-x;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#9900F9FF', endColorstr='#3300F9FF', GradientType=0);
  border-color: #00f9ff;
  box-shadow: 0 0 10px rgba(0, 249, 255, .6) inset;
  padding: 2px 8px;
  line-height: 1.5;
  border-radius: 3px;
  &:hover {
    background-color: transparent;
    background-image: linear-gradient(to bottom,rgba(0,249,255,.8) 0,rgba(0,249,255,.4) 100%);
    background-repeat: repeat-x;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#CC00F9FF', endColorstr='#6600F9FF', GradientType=0);
    border-color: #00f9ff;
    color: #b4feff;
    box-shadow: 0 0 10px rgba(0,249,255,.6) inset;
  }
}

.cs-box-content {
  background-color: #25222e;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.35);
  margin-top: 16px;
  padding: 16px;

  .cs-header-content {
    height: 34px;
    line-height: 34px;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    position: relative;

    >img {
      margin-right: 12px;
    }

    ul {
      display: inline-block;
      list-style: none;
      padding: 0;
      margin-bottom: 0;
      font-weight: normal;
      height: 32px;
      margin: 0;

      li {
        display: inline-block;
      }
    }

    .cs-list-group {
      font-size: 12px;
      line-height: 30px;

      li {
        padding: 0 16px;
        text-align: center;
        cursor: pointer;

        &:hover {
          border-bottom: 2px solid #00f9ff;
          color: #00f9ff;
        }

        &.active {
          border-bottom: 2px solid #00f9ff;
          color: #00f9ff;
        }
      }
    }

    .cs-btn-group {
      font-size: 14px;
      line-height: 30px;

      li {
        padding: 0 16px;
        text-align: center;
        border: 1px solid #426981;
        color: #6ED7FE;
        cursor: pointer;

        &:first-child {
          border-radius: 3px 0 0 3px;
        }

        &:last-child {
          border-radius: 0 3px 3px 0;
        }

        &:hover {
          border: 1px solid #00f9ff;
          color: #00f9ff;
          position: relative;
        }

        &.active {
          border: 1px solid #00f9ff;
          color: #00f9ff;
          position: relative;
        }
      }

      li+li {
        margin-left: -5px;
      }
    }

    .cs-title-unit {
      font-size: 14px;
      color: #acabb4;
      font-weight: normal;
      margin-right: 8px;
    }

    .select2 {
      .select2-selection {
        height: 26px;
      }

      .select2-selection__rendered {
        color: #fff !important;
        font-weight: normal;
        line-height: 24px !important;
      }

      .select2-selection__arrow b {
        top: 3px !important;
      }

    }
  }
}

.cs-sub-header {
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
}

.cs-sub-header .cs-sub-header-text {
  font-size: 14px;
  font-weight: bold;
  color: #7a7886;
  height: 16px;
  line-height: 16px;
}

.cs-sub-header .cs-sub-header-text::before {
  content: '';
  display: inline-block;
  width: 3px;
  height: 16px;
  background-color: #6ed7fe;
  position: relative;
  top: 2px;
  margin-right: 6px;
}

.cs-sub-header .cs-right-text {
  color: #7a7886;
  margin-right: 10px;
}

.cs-sub-header .select2 .select2-selection {
  height: 26px;
}

.cs-sub-header .select2 .select2-selection__rendered {
  color: #fff !important;
  font-weight: normal;
  line-height: 24px !important;
}

.cs-sub-header .select2 .select2-selection__arrow b {
  top: 3px !important;
}
</style>
<style lang="scss" scoped>
.page-container {
  width: 1920px;
  height: 1080px;
  transform-origin: left top;
  transform: scale(v-bind(scaleX), v-bind(scaleY));
  background: #1c1a26;
  cursor: pointer;

  .cs-main-header {
    width: 100%;
    height: 64px;
    text-align: center;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .cs-header-info {
      position: absolute;
      width: 100%;
      height: 100%;
      background: url(@/assets/img/screen/u22.png) no-repeat;
      background-size: 100% 100%;
      top: 0;
      left: 0;
      z-index: 0;

      img {
        margin-right: 12px;
      }
    }

    .cs-left-header {
      margin-left: 40px;
    }

    .cs-right-header {
      margin-right: 40px;
    }

    .cs-left-header,
    .cs-right-header {
      z-index: 1;
      display: flex;
      align-items: center;
      margin-top: 20px;

      .cs-left-text1 {
        font-size: 14px;
        color: #a9c5e7;
        margin-right: 20px;
        display: flex;
        align-items: center;

        img {
          width: 22px;
          height: 22px;
          margin-right: 8px;
        }
      }

      .cs-left-text2 {
        font-size: 14px;
        color: #fff;
        margin-right: 30px;
        display: flex;
        align-items: center;

        img {
          width: 36px;
          height: 36px;
        }
      }

      .cs-right-text2 {
        font-size: 14px;
        color: #fff;
        margin-right: 20px;
        display: flex;
        align-items: center;

        img {
          margin-right: 10px;
        }
      }

      .cs-quit {
        display: flex;
        align-items: center;
        cursor: pointer;

        img {
          width: 22px;
          height: 22px;
        }
      }
    }
  }

  .cs-main-content {
    width: 100%;
    height: calc(100% - 64px);
    display: flex;
    padding: 10px 20px;
  }
}
</style>