<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-26 13:19:34
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-26 20:49:30
 * @Description: 
-->
<template>
  <el-tree
    :data="AUTH_POINT_CONFIG"
    show-checkbox
    node-key="key"
    ref="treeRef"
    check-strictly
    @check="checkChange"
    :expand-on-click-node="false"
    :default-checked-keys="initData"
    :default-expanded-keys="defaultExpandKeys"
  >
    <template #default="{ node, data }">
      <span class="custom-tree-node">
        <el-icon color="#FFCC66" v-if="data.children && !node.expanded"
          ><Folder
        /></el-icon>
        <el-icon color="#FFCC66" v-if="data.children && node.expanded"
          ><FolderOpened
        /></el-icon>
        <el-icon color="#B4BCCC" v-if="!data.children"><Document /></el-icon>
        <span class="custom-tree-node-text">{{ data.label }}</span>
      </span>
    </template>
  </el-tree>
</template>
<script setup>
import { ref, nextTick } from "vue";
import remove from "lodash/remove";
import { AUTH_POINT_CONFIG } from "@/constant";
import { Document, Folder, FolderOpened } from "@element-plus/icons-vue";

const treeRef = ref();

const props = defineProps({
  initData: {
    type: Array,
    default: [],
  },
});
const defaultExpandKeys = [
  "operation",
  "device",
  "statistics",
  "backend",
  ...props.initData,
];

const checkChange = (data) => {
  const node = treeRef.value.getNode(data);
  const checks = treeRef.value.getCheckedNodes();
  if (
    node.checked &&
    data.type === "component" &&
    !checks.find((v) => v.key === node.parent.data.key)
  ) {
    checks.push(node.parent.data);
  }
  if (!node.checked && data.type === "page") {
    remove(checks, (v) => !!data.children.find((item) => item.key === v.key));
  }
  nextTick(() => {
    treeRef.value.setCheckedNodes(checks);
  });
};

const getCheckResult = () => {
  return treeRef.value.getCheckedKeys();
};

defineExpose({
  getCheckResult,
});
</script>
<style lang="scss" scoped>
.custom-tree-node {
  display: flex;
  align-items: center;
  .custom-tree-node-text {
    margin-left: 5px;
  }
}
</style>
