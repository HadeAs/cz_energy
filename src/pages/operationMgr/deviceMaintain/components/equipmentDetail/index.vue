<!--
 * @Author: ymZhang
 * @Date: 2023-12-25 16:30:39
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-08 15:34:26
 * @Description: 
-->
<template>
  <div class="cs-detail-container">
    <div class="cs-header">设备保养详情</div>
    <div class="cs-main-wrap equipment-detail-container">
      <Detail
        :equipment-model-id="equipmentModelId"
        :equipment-id="id"
        :project-id="projectId"
      />
      <History
        :equipment-model-id="equipmentModelId"
        :equipment-id="id"
        :project-id="projectId"
      />
    </div>
  </div>
</template>
<script setup name="EquipmentDetail">
import { useRoute } from "vue-router";
import Detail from "./detail.vue";
import History from "./history.vue";

const route = useRoute();

const { projectId, id, equipmentModelId } = route.params;
</script>
<style lang="scss" scoped>
.equipment-detail-container {
  display: flex;
  flex-direction: column;
}
</style>
