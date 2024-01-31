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
            <div style="display: flex;align-items: center;">
              <div>{{ item.year }}</div>
              <el-icon style="margin-left: 6px;cursor: pointer;" @click="() => deleteLcb(item)"><Delete /></el-icon>
            </div>
          </template>
        </el-step>
      </el-steps>
    </div>
    <el-button @click="handleAddLcb">增加里程碑</el-button>
  </MainContentContainer>
  <ProDrawer title="增加里程碑" ref="priceDrawerRef" @confirm="confirmLcb">
    <MilestoneDetail ref="priceConfigRef" />
  </ProDrawer>
</template>
<script name="StepContainer" setup>
import { reactive, ref } from "vue";
import MainContentContainer from "@/components/MainContentContainer.vue";
import u16459 from "@/assets/img/carbon/u16459.png";
import MilestoneDetail from './milestoneDetail.vue';
import { deleteMilestone, postMilestone } from '@/api/buildCarbon/neutral.js';
import { renderAxis } from '@/utils/index.js';
import { storeToRefs } from 'pinia';
import appStore from '@/store/index.js';
import { Delete } from "@element-plus/icons-vue";
import { ElMessageBox } from 'element-plus';

const { globalState } = storeToRefs(appStore.global);

const priceDrawerRef = ref();
const priceConfigRef = ref();

const emits = defineEmits([
  "reload",
]);

const props = defineProps({
  type: { type: Number, default: 0 },
  data: { type: Array, default: [] },
  defaultActive: { type: Number, default: 1 },
});

const state = reactive({
  activeStep: props.defaultActive,
});

const handleAddLcb = () => {
  priceDrawerRef.value.open();
}

const confirmLcb = async () => {
  const res = await priceConfigRef.value.validate();
  if (res) {
    const postRes = await postMilestone({
      ...res,
      type: props.type,
      year: Number(renderAxis('year', res.year)),
      projectId: globalState.value.projectId,
    })
    if (postRes && postRes?.code === 200) {
      emits("reload", {});
      priceDrawerRef.value.close();
    }
  }
}

const deleteLcb = ({ id }) => {
  ElMessageBox.confirm("确认删除当前里程碑吗？", "警告", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
  .then(async () => {
    const res = await deleteMilestone({ id, projectId: globalState.value.projectId });
    if (res?.code === 200) {
      emits("reload", {});
    }
  })
  .catch(() => {});
};

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
