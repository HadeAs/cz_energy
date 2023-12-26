<!--
 * @Author: ymZhang
 * @Date: 2023-12-24 16:57:31
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-25 16:33:08
 * @Description: 
-->
<template>
  <div class="cs-detail-container">
    <div class="cs-header">某型号设备保养详情</div>
    <div class="cs-main-wrap">
      <Detail />
      <List />
      <MaintainPlan />
      <MaintainFuture />
      <Attach />
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

const route = useRoute();
</script>
