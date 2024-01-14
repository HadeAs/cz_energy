<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-22 11:27:16
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-14 18:51:47
 * @Description: 
-->
<template>
  <div class="echart-tree-container">
    <div class="left">
      <div class="left-title">
        <span>数据对比</span>
        <el-tabs
          :style="{ visibility: showSwitch ? 'initial' : 'hidden' }"
          v-model="activeTab"
          @tab-change="handleTabChange"
        >
          <el-tab-pane label="时能耗" name="hour"></el-tab-pane>
          <el-tab-pane label="天能耗" name="day"></el-tab-pane>
          <el-tab-pane label="月能耗" name="month"></el-tab-pane>
          <el-tab-pane label="年能耗" name="year"></el-tab-pane>
        </el-tabs>
      </div>
      <Echart :option="chartOption" />
    </div>
    <div class="right">
      <el-scrollbar>
        <div class="right-title">
          <span class="select-var">选择变量</span>
          <div class="btn-add" v-if="allowAddVar" @click="openAddVarForm">
            +添加
          </div>
          <ProDrawer title="添加变量" ref="drawerRef" @confirm="confirmAddVar">
            <el-form ref="formRef" v-bind="COMMON_FORM_CONFIG" :model="varForm">
              <el-form-item label="变量组" required prop="groupName">
                <el-select v-model="varForm.groupName" placeholder="选择变量组">
                  <el-option
                    v-for="item in varGroupOptions"
                    :key="item"
                    v-bind="item"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="变量名称" required prop="varName">
                <el-input v-model="varForm.varName" />
              </el-form-item>
            </el-form>
          </ProDrawer>
        </div>
        <el-input
          v-model="varName"
          placeholder="请输入内容"
          :prefix-icon="Search"
          style="margin-bottom: 10px"
        />
        <el-tree
          :data="treeData"
          node-key="id"
          show-checkbox
          ref="treeRef"
          default-expand-all
          @check="treeCheckChangeHandle"
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
        >
          <template #default="{ node, data }">
            <div
              class="custom-tree-node"
              @mouseenter="enterTreeNode(data.id)"
              @mouseleave="leaveTreeNode()"
            >
              <span>{{ node.label }}</span>
              <span
                @click="confirmDelVar(node, data)"
                v-if="hoverNodeId === data.id && allowDelVar"
                class="del-btn"
                >删除</span
              >
            </div>
          </template>
        </el-tree>
      </el-scrollbar>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, nextTick, onMounted, reactive } from "vue";
import isEqual from "lodash/isEqual";
import uniqueId from "lodash/uniqueId";
import Echart from "@/components/Echart.vue";
import { Search } from "@element-plus/icons-vue";
import ProDrawer from "@/components/ProDrawer.vue";
import { COMMON_FORM_CONFIG } from "@/constant/formConfig";

const props = defineProps({
  showSwitch: {
    type: Boolean,
    default: false,
  },
  allowAddVar: {
    type: Boolean,
    default: false,
  },
  allowDelVar: {
    type: Boolean,
    default: false,
  },
  treeData: {
    type: Array,
    default: [],
  },
  chartOption: {
    type: Object,
  },
  defaultTreeCheckKeys: {
    type: Array,
    default: [],
  },
  conflict: {
    type: Boolean,
    default: true,
  },
});
defineExpose({
  getCheckedNodes: () => treeRef.value.getCheckedNodes(),
});
const emits = defineEmits(["type-change", "tree-check-change"]);

const treeRef = ref();
const varName = ref("");
const drawerRef = ref();
const formRef = ref();
const hoverNodeId = ref("");
const activeTab = ref("hour");
const treeData = ref(props.treeData);
const varGroupOptions = ref([]);
const varForm = reactive({
  groupName: "",
  varName: "",
});

watch(varName, (val) => {
  treeRef.value && treeRef.value.filter(val);
});

const filterNode = (value, data) => {
  if (!value) return true;
  return data.label.includes(value);
};

const enterTreeNode = (id) => {
  hoverNodeId.value = id;
};

const leaveTreeNode = () => {
  hoverNodeId.value = "";
};

const treeCheckChangeHandle = (data, { checkedKeys }) => {
  if (!props.conflict) {
    emits("tree-check-change");
    return;
  }
  const { id } = data;
  const currentNode = treeRef.value.getNode(data.id);
  const parentId = currentNode.data?.children?.length
    ? undefined
    : currentNode.parent.data.id;
  if (checkedKeys.includes(id)) {
    // 当前节点选中 （取消选中互斥的节点）
    const newCheckedNodes = [];
    const newChildKeys = checkedKeys.filter((v) => {
      const nodeData = treeRef.value.getNode(v);
      if (
        nodeData.data.id === parentId ||
        (parentId &&
          !nodeData.data?.children?.length &&
          nodeData.parent.data.id === parentId) ||
        (!parentId && nodeData.data.id === id)
      ) {
        newCheckedNodes.push(nodeData);
        return true;
      }
      return false;
    });
    if (!isEqual(newChildKeys, checkedKeys)) {
      nextTick(() => {
        treeRef.value.setCheckedKeys(newChildKeys);
        emits("tree-check-change");
      });
    } else {
      emits("tree-check-change");
    }
  } else {
    emits("tree-check-change");
  }
};

const openAddVarForm = () => {
  drawerRef.value.open();
  varForm.groupName = "";
  varForm.varName = "";
  const options = [];
  treeData.value.forEach((v) => {
    options.push({ label: v.label, value: v.label });
  });
  varGroupOptions.value = options;
};

const confirmAddVar = () => {
  formRef.value
    .validate()
    .then(() => {
      drawerRef.value.close();
      treeNodeAdd();
    })
    .catch(() => {});
};

const treeNodeAdd = () => {
  const checks = treeRef.value.getCheckedNodes();
  //模拟树增加节点
  treeData.value.forEach((v) => {
    if (v.label === varForm.groupName) {
      v.children.push({
        id: uniqueId("var_tree_"),
        label: varForm.varName,
      });
      //如果当前父节点已经处于check状态，新增完子节点之后，记得去掉它的check状态！！！
      const idx = checks.findIndex((item) => item.id === v.id);
      if (idx !== -1) {
        checks.splice(idx, 1);
      }
    }
  });
  treeData.value = [...treeData.value];
  nextTick(() => {
    treeRef.value.setCheckedNodes(checks);
  });
};

const confirmDelVar = (node, data) => {
  ElMessageBox.confirm("确认删除该变量嘛？", "警告", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      treeNodeDel(node, data);
      ElMessage({
        type: "success",
        message: "删除成功",
      });
    })
    .catch(() => {});
};

const treeNodeDel = (node, data) => {
  const checks = treeRef.value.getCheckedNodes();
  const idx = checks.findIndex((v) => v.id === data.id);
  if (idx !== -1) {
    checks.splice(idx, 1);
  }
  //模拟树删除节点
  const parent = node.parent;
  const children = parent.data.children || parent.data;
  const index = children.findIndex((d) => d.id === data.id);
  children.splice(index, 1);
  treeData.value = [...treeData.value];

  nextTick(() => {
    treeRef.value.setCheckedNodes(checks);
    treeCheckChangeHandle();
  });
};

const handleTabChange = (val) => {
  emits("type-change", val);
  const checks = treeRef.value.getCheckedNodes();
  nextTick(() => {
    treeRef.value.setCheckedNodes(checks);
  });
};

onMounted(() => {
  if (props.defaultTreeCheckKeys.length) {
    treeRef.value.setCheckedKeys(props.defaultTreeCheckKeys);
  }
});
</script>
<style lang="scss" scoped>
.echart-tree-container {
  background-color: #ffffff;
  border-radius: 5px;
  // margin-bottom: 10px;
  display: flex;
  flex-direction: row !important;
  .left-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px 15px;
    span {
      font-size: 16px;
      font-weight: 700;
      color: #000;
    }
  }
  .right-title {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    .select-var {
      font-size: 16px;
      font-weight: 700;
      color: #000;
    }
    .btn-add {
      color: red;
      cursor: pointer;
    }
  }
  .left {
    width: 80%;
    border-right: 1px solid #dfe4ed;
    padding: 0px 10px;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .right {
    width: 20%;
    padding: 0px 10px;
    height: 100%;
    overflow: auto;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .del-btn {
      color: red;
      margin-right: 5px;
    }
  }
}
</style>
