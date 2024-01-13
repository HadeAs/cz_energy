<!--
 * @Author: ymZhang
 * @Date: 2024-01-13 18:12:58
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-13 18:18:42
 * @Description: 
-->
<template>
  <CommonContainer title="调整建议" class="suggestion">
    <template #default>
      <div
        class="suggestion-container"
        v-for="(item, index) in suggestions"
        :key="index"
      >
        {{ index + 1 }}. {{ item }}
      </div>
    </template>
  </CommonContainer>
</template>
<script setup>
import CommonContainer from "./commonContainer.vue";

const props = defineProps({
  suggestions: { type: Array, default: [] },
});
</script>
<style lang="scss" scoped>
.suggestion {
  margin-top: 10px;
}
.suggestion-container {
  background: rgba(243, 245, 250, 1);
  border-radius: 3px;
  padding: 12px;
  margin-top: 10px;
  font-size: 14px;
  word-break: break-all;
}
</style>
