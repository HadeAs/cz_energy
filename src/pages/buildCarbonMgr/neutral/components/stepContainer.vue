<!--
 * @Author: ymZhang
 * @Date: 2024-01-13 12:45:30
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-13 18:40:40
 * @Description: 
-->
<template>
  <MainContentContainer class="time-line-container">
    <div class="left">
      <img :src="u16459" alt="img" />
    </div>
    <div class="right">
      <el-steps :active="state.activeStep" align-center>
        <el-step v-for="item in data" :key="item.title">
          <template #title>
            <div>{{ item.content }}</div>
          </template>
          <template #description>
            <div>{{ item.title }}</div>
          </template>
        </el-step>
      </el-steps>
    </div>
  </MainContentContainer>
</template>
<script name="StepContainer" setup>
import { reactive } from "vue";
import MainContentContainer from "@/components/MainContentContainer.vue";
import u16459 from "@/assets/img/carbon/u16459.png";

const props = defineProps({
  data: { type: Array, default: [] },
  defaultActive: { type: Number, default: 1 },
});
const state = reactive({
  activeStep: props.defaultActive,
});
</script>
<style lang="scss" scoped>
.time-line-container {
  display: flex;
  flex-direction: row !important;
  align-items: center;
  height: 100px !important;
  padding: 0 20px 0 0 !important;
  background-image: url("@/assets/img/carbon/u16457.png");
  background-size: cover;
  background-color: transparent;
  margin-bottom: 10px;
  overflow: hidden;
  .left {
    img {
      width: 102px;
      height: 98px;
    }
  }
  .right {
    flex: 1;
    :deep() {
      .el-step__line {
        top: 10px;
        background-color: #cfd6e5;
      }
      .el-step.is-horizontal {
        position: relative;
        padding-top: 30px;
        padding-bottom: 30px;
      }
      .el-step__icon {
        width: 10px;
        height: 10px;
      }
      .el-step__icon-inner {
        display: none;
      }
      .el-step__head.is-process,
      .el-step__head.is-wait {
        color: var(--el-text-color-placeholder);
        border-color: var(--el-text-color-placeholder);
        .el-step__icon {
          background: var(--el-text-color-placeholder);
        }
      }
      .el-step__head.is-finish {
        color: #2685f6;
        border-color: #2685f6;
        .el-step__icon {
          background: #2685f6;
        }
      }
      .el-step__title.is-finish,
      .el-step__description.is-finish {
        color: #333;
        font-weight: 700;
      }
      .el-step__title.is-process,
      .el-step__description.is-process {
        color: var(--el-text-color-placeholder);
        font-weight: normal;
      }
      .el-step__description.is-process,
      .el-step__description.is-wait {
        color: #2d2f33;
      }
      .el-step__main {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        .el-step__title,
        .el-step__description {
          line-height: 30px;
          font-size: 14px;
        }
        .el-step__title {
          margin-bottom: 22px;
          height: 30px;
        }
      }
    }
  }
}
</style>
