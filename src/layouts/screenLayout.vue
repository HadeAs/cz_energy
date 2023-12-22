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
import { useResizeObserver } from '@vueuse/core'
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
//   debugger
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