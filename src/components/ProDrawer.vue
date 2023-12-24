<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-24 10:20:40
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-24 11:42:46
 * @Description: 
-->
<template>
  <el-drawer v-model="visibile" destroy-on-close>
    <template #header>
      <div class="drawer-title">{{ title }}</div>
    </template>
    <template #default>
      <slot></slot>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>
<script setup>
import { ref } from "vue";

defineProps(["title"]);
defineExpose({
  open: () => {
    visibile.value = true;
  },
  close: () => {
    visibile.value = false;
  },
});
const emits = defineEmits(["confirm", "cancel"]);

const visibile = ref(false);

const cancelClick = () => {
  emits("cancel");
  visibile.value = false;
};
const confirmClick = async () => {
  emits("confirm");
};
</script>
<style lang="scss" scoped>
.drawer-title {
  font-weight: 700;
  font-style: normal;
  font-size: 16px;
  color: #000000;
}
</style>
