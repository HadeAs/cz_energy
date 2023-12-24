<!--
 * @Author: ymZhang
 * @Date: 2023-12-24 16:57:31
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-24 18:06:15
 * @Description: 
-->
<template>
  <div class="cs-detail-container">
    <div class="cs-header">某型号设备保养详情</div>
    <Detail1 />
  </div>
</template>
<script setup name="DeviceDetail">
import { reactive } from "vue";
import { useRoute } from "vue-router";
import Detail1 from "./detail1.vue";

const route = useRoute();
</script>
<style lang="scss" scoped>
.cs-detail-container {
}
</style>
