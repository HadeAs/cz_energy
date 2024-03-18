<!--
 * @Author: ymZhang
 * @Date: 2023-12-24 16:57:31
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-20 13:34:18
 * @Description: 
-->
<template>
  <div class="cs-detail-container">
    <div class="cs-header">{{ state.detail.modelNum }} 型号设备保养详情</div>
    <div class="cs-main-wrap">
      <Detail
        :device-id="id"
        :num="num"
        :project-id="projectId"
        :detail="state.detail"
      />
      <List :device-id="id" :project-id="projectId" />
      <MaintainPlan
        :device-id="id"
        :project-id="projectId"
        :list="state.detail.maintainPlanList"
        @reload="getDetail"
      />
      <MaintainFuture
        :device-id="id"
        :project-id="projectId"
        :plan="state.detail.fiveYearMaintainPlan"
        @reload="getDetail"
      />
      <Attach
        :device-id="id"
        :project-id="projectId"
        :file-url="state.detail.maintainAppendix"
        @reload="getDetail"
      />
    </div>
  </div>
</template>
<script setup name="DeviceDetail">
import { reactive } from "vue";
import { useRoute } from "vue-router";
import Detail from "./detail.vue";
import List from "./list.vue";
import MaintainPlan from "./maintainPlan.vue";
import MaintainFuture from "./maintainFuture.vue";
import Attach from "./attach.vue";
import { getDeviceTypeInfo } from "@/api/operationMgr/deviceMaintain";

const route = useRoute();
const { projectId, id, num } = route.params;

const state = reactive({
  detail: {},
});
const getDetail = async () => {
  const { data } = await getDeviceTypeInfo({
    projectId,
    equipmentModelId: id,
  });
  if (data?.data) {
    state.detail = data.data;
  }
};
getDetail();
</script>
