<!--
 * @Author: ymZhang
 * @Date: 2023-12-25 16:50:45
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-07 19:40:25
 * @Description: 
-->
<template>
  <BoxContainer class="equipment-box-history" title="设备历史保养记录">
    <el-form :inline="true" :model="state.formData">
      <el-form-item label="保养时间：" prop="timeType">
        <el-radio-group v-model="state.formData.timeType">
          <el-radio-button
            v-for="item in state.opts"
            :key="item.value"
            :label="item.value"
            >{{ item.label }}</el-radio-button
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="state.formData.timeType === '4'" prop="timeRange">
        <el-date-picker
          v-model="state.formData.timeRange"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD"
          range-separator="~"
        />
      </el-form-item>
    </el-form>
    <el-empty v-if="!state.historyList.length" description="暂无保养记录" />
    <el-timeline v-else>
      <el-timeline-item
        v-for="(activity, i) in state.historyList"
        :key="activity.id"
        :timestamp="activity.time"
        placement="top"
        :color="i === 0 ? '#2985F7' : ''"
      >
        <div class="cs-info-wrap">
          <div class="cs-info">
            <span class="cs-label">保养人员：</span>
            <span class="cs-text">{{ activity.maintainUser }}</span>
          </div>
        </div>
        <div class="cs-info-wrap flex">
          <div class="cs-info margin-right-large-5">
            <span class="cs-label">作业单号：</span>
            <span class="cs-text">{{ activity.jobNumber }}</span>
          </div>
          <div class="cs-info">
            <span class="cs-label">设备照片：</span>
            <span
              class="cs-text"
              v-for="item in activity.images"
              :key="item.url"
            >
              <a href="">{{ item.name }}</a>
            </span>
          </div>
        </div>
        <div class="cs-info-wrap">
          <div class="cs-info">
            <span class="cs-label">作业内容：</span>
            <span class="cs-text">{{ activity.jobContent }}</span>
          </div>
        </div>
      </el-timeline-item>
    </el-timeline>
  </BoxContainer>
</template>
<script setup name="History">
import { reactive } from "vue";
import BoxContainer from "../boxContainer.vue";
import { getDeviceMaintainRecords } from "@/api/operationMgr/deviceMaintain";

const props = defineProps({
  equipmentModelId: { type: String },
  equipmentId: { type: String },
  projectId: { type: Number },
});

const state = reactive({
  formData: {
    timeType: "all",
    timeRange: [],
  },
  opts: [
    { label: "全部", value: "all" },
    { label: "近一月", value: "1" },
    { label: "近半年", value: "2" },
    { label: "近一年", value: "3" },
    { label: "自定义", value: "4" },
  ],
  historyList: [],
});

const getRecords = async () => {
  const { data } = await getDeviceMaintainRecords({
    projectId: props.projectId,
    equipmentId: props.equipmentId,
  });
  if (data?.list) {
    state.historyList = data.list.map((item) => {
      const { image1, image2, image3, image4, image5, ...rest } = item;
      const effectiveImages = [image1, image2, image3, image4, image5]
        .filter((item) => item)
        .map((item, index) => ({
          url: item,
          name: `照片0${index + 1}`,
        }));
      return {
        ...rest,
        images: effectiveImages,
      };
    });
  }
};
getRecords();

const parseUrl = (url) => {
  const arr = url.split("/");
  return arr[arr.length - 1];
};
</script>
<style scoped lang="scss">
.equipment-box-history {
  .cs-info-wrap {
    .cs-label {
      color: #a2aabb;
    }
    .cs-text {
      margin-right: 12px;
    }
    .margin-right-large-5 {
      margin-right: 56px;
      min-width: 280px;
    }
    a {
      background-color: transparent;
      color: #2985f7;
      text-decoration: none;
    }
    &.flex {
      display: flex;
    }
  }
  :deep() {
    .el-timeline-item__timestamp {
      color: #333;
      font-weight: bold;
      font-size: 14px;
    }
  }
}
</style>
