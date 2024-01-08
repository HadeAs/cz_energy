<!--
 * @Author: ymZhang
 * @Date: 2023-12-25 16:50:45
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-08 14:57:57
 * @Description: 
-->
<template>
  <BoxContainer class="equipment-box-history" title="设备历史保养记录">
    <el-form :inline="true" :model="state.formData">
      <el-form-item label="保养时间：" prop="timeType">
        <el-radio-group
          v-model="state.formData.timeType"
          @change="getRecords()"
        >
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
          range-separator="~"
          :value-format="COMMON_DATE_FORMAT"
          @change="getRecords(true)"
        />
      </el-form-item>
    </el-form>
    <el-empty v-if="!state.historyList.length" description="暂无保养记录" />
    <el-timeline v-else>
      <el-timeline-item
        v-for="(activity, i) in state.historyList"
        :key="activity.id"
        :timestamp="activity.maintainDate"
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
              <el-button link type="primary" @click="handleImgClick(item)">{{
                item.name
              }}</el-button>
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
    <el-image-viewer
      v-if="state.showPreview"
      :url-list="state.previewList"
      hide-on-click-modal
      @close="state.showPreview = false"
    />
  </BoxContainer>
</template>
<script setup name="History">
import { reactive, ref } from "vue";
import BoxContainer from "../boxContainer.vue";
import { getImageUrl } from "@/api/common";
import { getDeviceMaintainRecords } from "@/api/operationMgr/deviceMaintain";
import dayjs from "dayjs";
import { COMMON_DATE_TIME_FORMAT, COMMON_DATE_FORMAT } from "@/constant";
import { transformFileToUrl } from "@/utils";
import u6595 from "@/assets/img/device/u6595.png";

const props = defineProps({
  equipmentModelId: { type: String },
  equipmentId: { type: String },
  projectId: { type: String },
});

const previewImg = ref();
const state = reactive({
  formData: {
    timeType: "all",
    timeRange: [],
    startDate: "",
    endDate: "",
  },
  opts: [
    { label: "全部", value: "all" },
    { label: "近一月", value: "1" },
    { label: "近半年", value: "2" },
    { label: "近一年", value: "3" },
    { label: "自定义", value: "4" },
  ],
  historyList: [],
  previewList: [],
  showPreview: false,
});

const getFilter = (ifIdentify) => {
  const { timeType, timeRange } = state.formData;
  if (timeType === "4" && !ifIdentify) return false;
  if (timeType === "all") return {};
  const now = dayjs();
  let startDate = "";
  let endDate = "";
  if (timeType === "1") {
    startDate = now
      .subtract(1, "month")
      .startOf("month")
      .format(COMMON_DATE_TIME_FORMAT);
    endDate = now
      .subtract(1, "month")
      .endOf("month")
      .format(COMMON_DATE_TIME_FORMAT);
  } else if (timeType === "2") {
    startDate = now
      .subtract(6, "month")
      .startOf("month")
      .format(COMMON_DATE_TIME_FORMAT);
    endDate = now.endOf("month").format(COMMON_DATE_TIME_FORMAT);
  } else if (timeType === "3") {
    startDate = now
      .subtract(1, "year")
      .startOf("year")
      .format(COMMON_DATE_TIME_FORMAT);
    endDate = now.endOf("month").format(COMMON_DATE_TIME_FORMAT);
  } else {
    if (timeRange?.length) {
      startDate = timeRange[0] + " 00:00:00";
      endDate = timeRange[1] + " 00:00:00";
    }
  }
  return { startDate, endDate };
};
const getRecords = async (ifIdentify = false) => {
  const filter = getFilter(ifIdentify);
  if (!filter) return false;
  const { data } = await getDeviceMaintainRecords({
    projectId: props.projectId,
    equipmentId: props.equipmentId,
    ...filter,
  });
  if (data?.list) {
    state.historyList = data.list.map((item) => {
      const { image1, image2, image3, image4, image5, ...rest } = item;
      const effectiveImages = [image1, image2, image3, image4, image5]
        .filter((item) => item)
        .map((item, index) => {
          const [name, suffix] = item.split(".");
          return {
            url: item,
            name: `照片0${index + 1}.${suffix}`,
          };
        });
      return {
        ...rest,
        images: effectiveImages,
      };
    });
  }
};
getRecords();

const handleImgClick = async (item) => {
  const { url } = item;
  const data = await getImageUrl(url);
  state.previewList = [transformFileToUrl(data)];
  state.showPreview = true;
};
</script>
<style scoped lang="scss">
.equipment-box-history {
  .cs-info-wrap {
    .cs-label {
      color: #a2aabb;
    }
    .cs-text {
      margin-right: 20px;
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
