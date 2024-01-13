<!--
 * @Author: ymZhang
 * @Date: 2024-01-13 17:45:17
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-13 18:19:41
 * @Description: 
-->
<template>
  <MainContentContainer class="container">
    <div class="common-title">{{ title }}</div>
    <slot></slot>
  </MainContentContainer>
</template>
<script setup>
defineProps({
  title: { type: String },
});
</script>
<style lang="scss" scoped>
.container {
  padding: 10px 20px !important;
  height: unset !important;
  .common-title {
    position: relative;
    padding-left: 12px;
    font-size: 14px;
    font-weight: 700;
    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 4px;
      background: var(--el-color-primary);
      left: 0;
      top: 3px;
      bottom: 3px;
    }
  }
}
</style>
