<!--
 * @Author: ymZhang
 * @Date: 2023-12-24 16:57:31
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-25 14:00:24
 * @Description: 
-->
<template>
  <div class="cs-detail-container">
    <div class="cs-header">某型号设备保养详情</div>
    <div class="cs-main-wrap">
      <Detail1 />
      <List1 />
      <MaintainPlan />
      <MaintainFuture />
    </div>
  </div>
</template>
<script setup name="DeviceDetail">
import { reactive } from "vue";
import { useRoute } from "vue-router";
import Detail1 from "./detail1.vue";
import List1 from "./list1.vue";
import MaintainPlan from "./maintainPlan.vue";
import MaintainFuture from "./maintainFuture.vue";

const route = useRoute();
</script>
