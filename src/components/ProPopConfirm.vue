<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-21 15:56:32
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-21 16:11:50
 * @Description: 
-->
<template>
  <el-popconfirm
    width="220"
    :icon="icon"
    :title="title"
    :icon-color="iconColor"
    confirm-button-text="确认"
    cancel-button-text="取消"
    cancel-button-type="default"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
    <template #reference>
      <slot></slot>
    </template>
  </el-popconfirm>
</template>
<script setup>
defineProps(["icon", "iconColor", "title"]);
const emits = defineEmits(["confirm", "cancel"]);

const onConfirm = () => {
  emits("confirm");
};
const onCancel = () => {
  emits("cancel");
};
</script>
