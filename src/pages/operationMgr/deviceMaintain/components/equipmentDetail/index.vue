<!--
 * @Author: ymZhang
 * @Date: 2023-12-25 16:30:39
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-07 16:48:54
 * @Description: 
-->
<template>
  <div class="cs-detail-container">
    <div class="cs-header">设备保养详情</div>
    <div class="cs-main-wrap">
      <Detail
        :equipment-model-id="equipmentModelId"
        :equipment-id="id"
        :project-id="globalState.projectId"
      />
      <History
        :equipment-model-id="equipmentModelId"
        :equipment-id="id"
        :project-id="globalState.projectId"
      />
    </div>
  </div>
</template>
<script setup name="EquipmentDetail">
// import { reactive } from "vue";
import { useRoute } from "vue-router";
import Detail from "./detail.vue";
import History from "./history.vue";
import { storeToRefs } from "pinia";
import appStore from "@/store";

const route = useRoute();

const { id, equipmentModelId } = route.params;
const { globalState } = storeToRefs(appStore.global);
</script>
