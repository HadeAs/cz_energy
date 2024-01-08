<!--
 * @Author: ymZhang
 * @Date: 2023-12-24 18:04:50
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-08 12:45:33
 * @Description: 
-->
<template>
  <BoxContainer title="设备详情">
    <el-descriptions :column="3" size="default" border>
      <el-descriptions-item
        v-for="(item, index) in state.exclData"
        :key="index"
        :label="item.name"
        label-align="right"
        label-class-name="detail-label"
      >
        {{ item.value }}
      </el-descriptions-item>
    </el-descriptions>
  </BoxContainer>
</template>
<script setup name="Detail">
import { reactive, watch } from "vue";
import BoxContainer from "../boxContainer.vue";

const props = defineProps({
  deviceId: { type: String },
  num: { type: String },
  projectId: { type: String },
  detail: { type: Object },
});
const state = reactive({
  exclData: [],
});

const getDetail = () => {
  const item = props.detail;
  const { equipmentModelParamList = [] } = item;
  const arr = [
    { name: "设备名称", value: item.name },
    ...equipmentModelParamList,
    // { name: "型号", value: item.modelNum },
    // { name: "制冷量（kw）", value: "开发中" },
    // { name: "制热量（kw）", value: "开发中" },
    // { name: "电源", value: "开发中" },
    // { name: "压缩机形式", value: "开发中" },
    // { name: "额定功率（kw）", value: "开发中" },
    // { name: "冷媒", value: "开发中" },
    // { name: "蒸发器水流量（L/s）", value: "开发中" },
    // { name: "冷凝器水流量（L/s）", value: "开发中" },
    // { name: "外形尺寸（mm）", value: "开发中" },
  ];
  arr.splice(2, 0, {
    name: "设备数量",
    value: props.num,
  });
  state.exclData = arr;
};

watch(
  () => props.detail,
  () => {
    getDetail();
  },
  { immediate: true }
);
</script>
<style lang="scss">
.detail-label {
  width: 200px;
  padding: 0 15px;
}
</style>
