<!--
 * @Author: ymZhang
 * @Date: 2023-12-24 17:30:44
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-24 18:01:13
 * @Description: 
-->
<template>
  <MainContentContainer class="contain">
    <div class="cs-box-title">
      <span class="cs-title-text">{{ title }}</span>
    </div>
    <div class="cs-box-wrap">
      <slot></slot>
    </div>
  </MainContentContainer>
</template>
<script setup name="BoxContainer">
import MainContentContainer from "@/components/MainContentContainer.vue";
defineProps(["title"]);
</script>
<style lang="scss" scoped>
.contain {
  margin-bottom: 10px;
  margin-top: 10px;
  .cs-box-title {
    height: 48px;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .cs-box-title .cs-title-text {
    font-size: 16px;
    font-weight: bold;
  }
  .cs-box-wrap {
    padding: 0 24px 18px 24px;
  }
}

// .cs-box-title .cs-title-text .aidicon {
//   color: #2985f7;
//   font-size: 18px;
//   margin-right: 8px;
//   position: relative;
//   top: 3px;
// }
</style>
