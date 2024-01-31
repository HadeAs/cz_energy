<!--
 * @Author: ymZhang
 * @Date: 2024-01-13 14:47:26
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-13 16:17:45
 * @Description: 
-->
<template>
  <div class="center-container">
    <MainContentContainer class="left">
      <span class="count-down-title">{{ countdownTitle }}倒计时</span>
      <div class="count-down-value">
        <span v-for="item in String(countdownValue || 0).split('')" :key="item">
          <label>{{ item }}</label>
        </span>
      </div>
    </MainContentContainer>
    <MainContentContainer class="right">
      <div class="center-container-inner" @click="handleConfigKh">
        <div
          class="param-container"
          v-for="(item, index) in params"
          :key="index"
        >
          <div
            class="param-item"
            v-for="data in item.children"
            :key="data.value"
          >
            <img :src="data.image" />
            <div class="param-detail">
              <span>{{ data.title }}</span>
              <span
                >{{ data.value }}<label>{{ data.unit }}</label></span
              >
            </div>
          </div>
        </div>
      </div>
      <el-divider class="divide" direction="vertical" />
      <div class="right-container">
        <div class="left-circle">{{ process }}<label>%</label></div>
        <div class="right-progress">
          <span>{{ countdownTitle }}完成进度</span>
          <el-progress
            :stroke-width="10"
            :percentage="process"
            :show-text="false"
          />
        </div>
      </div>
    </MainContentContainer>
  </div>
  <ProDrawer title="配置碳达峰、中和目标" ref="khDrawerRef" @confirm="confirmLcb">
    <KhConfig ref="khConfigRef" />
  </ProDrawer>
</template>
<script setup name="CenterContainer">
import { ref } from 'vue';
import MainContentContainer from "@/components/MainContentContainer.vue";
import KhConfig from './khConfig.vue';
import { postNtTarget } from '@/api/buildCarbon/neutral.js';

const khDrawerRef = ref();
const khConfigRef = ref();

const emits = defineEmits([
  "reload",
]);

const props = defineProps({
  countdownTitle: { type: String },
  countdownValue: { type: Number },
  params: { type: Array, default: [] },
  process: { type: Number, default: 0 },
});

const handleConfigKh = () => {
  khDrawerRef.value.open();
}

const confirmLcb = async () => {
  const res = await khConfigRef.value.validate();
  if (res) {
    const postRes = await postNtTarget(res)
    if (postRes && postRes?.code === 200) {
      emits("reload", {});
      khDrawerRef.value.close();
    }
  }
};

</script>
<style lang="scss" scoped>
.center-container {
  display: flex;
  .left {
    padding-top: 16px;
    .count-down-title {
      font-weight: 700;
      font-size: 16px;
      color: #2d2f33;
    }
    .count-down-value {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 18px 22px 2px 18px;
      span {
        font-weight: 700;
        font-size: 48px;
        color: #333;
        display: block;
        background-color: #f2f4fa;
        border: 1px solid #d3d7ed;
        border-radius: 2px;
        width: 42px;
        line-height: 74px;
        margin-right: 10px;
        position: relative;
        text-align: center;
        &:last-child {
          margin-right: 0;
        }
        &::after {
          content: "";
          position: absolute;
          height: 1px;
          width: 100%;
          background: #d3d7ed;
          top: 50%;
          left: 50%;
          z-index: 0;
          transform: translateX(-50%) translateY(-50%);
        }
        label {
          position: relative;
          z-index: 1;
        }
      }
      &::after {
        content: "天";
        position: absolute;
        right: 0;
        bottom: 0;
        font-weight: normal;
        font-size: 14px;
      }
    }
  }
  .right {
    padding-top: 16px;
    flex: 1;
    display: flex;
    margin-left: 10px;
    .center-container-inner {
      // flex: 1;
      width: 57%;
      display: flex;
      flex-direction: column;
      .param-container {
        flex: 1;
        display: flex;
        margin-top: 10px;
        &:first-child {
          margin-top: 0;
        }
        .param-item {
          display: flex;
          align-items: center;
          // justify-content: space-around;
          flex: 1;
          // &:last-child {
          //   margin-left: 100px;
          // }
          img {
            width: 60px;
            height: 60px;
          }
          .param-detail {
            display: flex;
            flex-direction: column;
            margin-left: 10px;
            span {
              flex: 1;
              &:first-child {
                font-size: 14px;
                color: #2d2f33;
              }
              &:last-child {
                font-weight: 700;
                font-size: 20px;
                // margin-block: 8px;
                label {
                  margin-left: 5px;
                  font-size: 14px;
                  font-weight: normal;
                }
              }
            }
          }
        }
      }
    }
    .divide {
      height: 100%;
    }
    .right-container {
      position: relative;
      display: flex;
      align-items: center;
      flex: 1;
      margin-left: 20px;
      &:after {
        content: "";
        display: block;
        position: absolute;
        height: 100%;
        left: 40px;
        right: 40px;
        top: 0;
        background-image: url("@/assets/img/carbon/u16547.png");
        background-size: cover;
        opacity: 0.5;
      }
      .left-circle {
        width: 78px;
        height: 78px;
        background-image: url("@/assets/img/carbon/u17520.png");
        background-size: cover;
        text-align: center;
        color: #fff;
        font-size: 28px;
        font-weight: 700;
        line-height: 77px;
        label {
          font-size: 13px;
          font-weight: normal;
        }
      }
      .right-progress {
        flex: 1;
        margin-left: 35px;
        > span {
          font-size: 16px;
          color: #2d2f33;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
