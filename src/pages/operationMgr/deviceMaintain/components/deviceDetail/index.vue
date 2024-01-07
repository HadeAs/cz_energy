<!--
 * @Author: ymZhang
 * @Date: 2023-12-24 16:57:31
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-07 15:22:19
 * @Description: 
-->
<template>
  <div class="cs-detail-container">
    <div class="cs-header">某型号设备保养详情</div>
    <div class="cs-main-wrap">
      <Detail :device-id="id" :num="num" :project-id="globalState.projectId" />
      <List :device-id="id" :project-id="globalState.projectId" />
      <MaintainPlan :device-id="id" :project-id="globalState.projectId" />
      <MaintainFuture :device-id="id" :project-id="globalState.projectId" />
      <Attach :device-id="id" :project-id="globalState.projectId" />
    </div>
  </div>
</template>
<script setup name="DeviceDetail">
import { ref } from "vue";
import { useRoute } from "vue-router";
import Detail from "./detail.vue";
import List from "./list.vue";
import MaintainPlan from "./maintainPlan.vue";
import MaintainFuture from "./maintainFuture.vue";
import Attach from "./attach.vue";
import { storeToRefs } from "pinia";
import appStore from "@/store";

const route = useRoute();
const id = ref(route.params.id);
const num = ref(route.params.num);
const { globalState } = storeToRefs(appStore.global);
</script>
