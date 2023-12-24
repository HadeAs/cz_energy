<!--
 * @Author: ymZhang
 * @Date: 2023-12-24 18:04:50
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-24 18:05:01
 * @Description: 
-->
<template>
  <BoxContainer title="设备详情">
    <el-descriptions :column="3" size="default" border>
      <el-descriptions-item
        v-for="(item, index) in state.exclData"
        :key="index"
        :label="item.label"
      >
        {{ item.value }}
      </el-descriptions-item>
    </el-descriptions>
  </BoxContainer>
</template>
<script setup name="Detail1">
import { reactive } from "vue";
import { useRoute } from "vue-router";
import BoxContainer from "./boxContainer.vue";

const route = useRoute();
const state = reactive({
  exclData: [
    { label: "设备名称", value: "某某设备" },
    { label: "型号", value: "AL264694" },
    { label: "设备数量", value: 6 },
    { label: "制冷量（kw）", value: 12 },
    { label: "制热量（kw）", value: 10 },
    { label: "电源", value: "这是电源" },
    { label: "压缩机形式", value: "某某形式" },
    { label: "额定功率（kw）", value: "100" },
    { label: "冷媒", value: "43235" },
    { label: "蒸发器水流量（L/s）", value: "54" },
    { label: "冷凝器水流量（L/s）", value: "1452" },
    { label: "外形尺寸（mm）", value: "60*60*60" },
  ],
});
</script>
