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
    default-expand-all
    @check="checkChange"
    :expand-on-click-node="false"
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
import { ref, nextTick, onMounted, reactive } from "vue";
import remove from "lodash/remove";
import { AUTH_POINT_CONFIG } from "@/constant";
import { Document, Folder, FolderOpened } from "@element-plus/icons-vue";
import { fetchOneRole } from '@/api/backstageMng/authMng.js';

const treeRef = ref();

const props = defineProps({
  initData: {
    type: Object,
    default: {},
  },
});
// const defaultExpandKeys = [
//   "project",
//   "systemlog",
//   "carbon",
//   "project_add",
//   "systemlog_login_search",
// ];

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

const state = reactive({ keys: [] });

onMounted(async () => {
  if (props.initData) {
    const { data } = await fetchOneRole(props.initData);
    if (data?.data) {
      state.keys = data?.data?.resourceIds || [];
      treeRef.value.setCheckedKeys(state.keys)
    }
  }
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
