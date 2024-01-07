<!--
 * @Author: ymZhang
 * @Date: 2023-12-24 18:04:50
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-07 15:28:13
 * @Description: 
-->
<template>
  <BoxContainer title="设备详情">
    <el-descriptions :column="3" size="default" border>
      <el-descriptions-item
        v-for="(item, index) in state.exclData"
        :key="index"
        :label="item.label"
        label-align="right"
        label-class-name="detail-label"
      >
        {{ item.value }}
      </el-descriptions-item>
    </el-descriptions>
  </BoxContainer>
</template>
<script setup name="Detail">
import { reactive } from "vue";
import BoxContainer from "../boxContainer.vue";
import { getInfo } from "@/api/operationMgr/deviceMaintain";

const props = defineProps({
  deviceId: { type: String },
  num: { type: String },
  projectId: { type: Number },
});
const state = reactive({
  exclData: [],
});

const getDetail = async () => {
  const { data } = await getInfo({
    projectId: props.projectId,
    equipmentId: props.deviceId,
  });
  if (data?.data) {
    const item = data.data;
    state.exclData = [
      { label: "设备名称", value: item.name },
      { label: "型号", value: item.modelNum },
      { label: "设备数量", value: props.num },
      { label: "制冷量（kw）", value: "开发中" },
      { label: "制热量（kw）", value: "开发中" },
      { label: "电源", value: "开发中" },
      { label: "压缩机形式", value: "开发中" },
      { label: "额定功率（kw）", value: "开发中" },
      { label: "冷媒", value: "开发中" },
      { label: "蒸发器水流量（L/s）", value: "开发中" },
      { label: "冷凝器水流量（L/s）", value: "开发中" },
      { label: "外形尺寸（mm）", value: "开发中" },
    ];
  }
};
getDetail();
</script>
<style lang="scss">
.detail-label {
  width: 200px;
  padding: 0 15px;
}
</style>
