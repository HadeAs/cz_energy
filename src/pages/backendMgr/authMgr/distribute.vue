<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-26 13:19:34
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-16 23:21:25
 * @Description: 
-->
<template>
  <el-tree
    :props="treeProp"
    :data="state.resourceList"
    show-checkbox
    node-key="id"
    ref="treeRef"
    default-expand-all
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
        <span class="custom-tree-node-text">{{ data.name }}</span>
      </span>
    </template>
  </el-tree>
</template>
<script setup>
import { ref, nextTick, onMounted, reactive } from "vue";
import appStore from "@/store";
import { storeToRefs } from "pinia";
import remove from "lodash/remove";
import { Document, Folder, FolderOpened } from "@element-plus/icons-vue";
import { fetchOneRole } from "@/api/backstageMng/authMng.js";
import { transformArrayToTree } from "@/utils";
const { globalState } = storeToRefs(appStore.global);

const treeRef = ref();

const props = defineProps({
  initData: {
    type: Object,
    default: {},
  },
});

const treeProp = {
  label: "name",
  children: "children",
  disabled: (data) => data.level === 1,
};
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
    data.level === 3 &&
    !checks.find((v) => v.id === node.parent.data.id)
  ) {
    checks.push(node.parent.data);
  }
  if (!node.checked && data.level === 2) {
    remove(checks, (v) => !!data.children.find((item) => item.id === v.id));
  }
  nextTick(() => {
    treeRef.value.setCheckedNodes(checks);
  });
};

const getCheckResult = () => {
  const checkedKeys = treeRef.value.getCheckedKeys();
  // const halfCheckedKeys = treeRef.value.getHalfCheckedKeys();
  const checkChildren = checkedKeys.filter((item) => String(item).length > 2);
  return checkChildren;
};

defineExpose({
  getCheckResult,
});

const transformResource = () => {
  const list = globalState.value.resourceList || [];
  const tree = transformArrayToTree(list, "parentId", "id");
  return tree;
};

const state = reactive({ keys: [], resourceList: [] });

onMounted(async () => {
  state.resourceList = transformResource();
  if (props.initData) {
    const { data } = await fetchOneRole(props.initData);
    if (data?.data) {
      state.keys = data?.data?.resourceIds || [];
      treeRef.value.setCheckedKeys(state.keys);
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
