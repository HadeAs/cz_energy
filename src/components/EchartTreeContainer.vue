<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-22 11:27:16
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-24 09:59:53
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
      <div class="right-title">
        <span>选择变量</span>
        <div v-if="allowAddVar">+添加</div>
      </div>
      <el-input
        v-model="varName"
        placeholder="请输入内容"
        :prefix-icon="Search"
        style="margin-bottom: 10px"
      />
      <el-tree
        :data="treeData"
        show-checkbox
        node-key="id"
        ref="treeRef"
        default-expand-all
        @check="treeCheckChangeHandle"
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        :default-checked-keys="defaultTreeCheckKeys"
      >
        <template #default="{ node, data }">
          <div
            class="custom-tree-node"
            @mouseenter="enterTreeNode(data.id)"
            @mouseleave="leaveTreeNode()"
          >
            <span>{{ node.label }}</span>
            <span
              @click="treeNodeDelete(data)"
              v-if="hoverNodeId === data.id"
              class="del-btn"
              >删除</span
            >
          </div>
        </template>
      </el-tree>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, nextTick, onMounted } from "vue";
import Echart from "@/components/Echart.vue";
import { Search } from "@element-plus/icons-vue";

const props = defineProps({
  showSwitch: {
    type: Boolean,
    default: false,
  },
  allowAddVar: {
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
});
defineExpose({
  getCheckedNodes: () => treeRef.value.getCheckedNodes(),
});
const emits = defineEmits(["type-change", "tree-check-change"]);

const treeRef = ref();
const varName = ref("");
const hoverNodeId = ref("");
const activeTab = ref("hour");
const treeData = ref(props.treeData);

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

const treeCheckValid = () => {
  const checks = treeRef.value.getCheckedNodes();
  const checkchilds = checks.filter((v) => !v.children);
  //跨父节点节点禁止点击
  if (checkchilds.length) {
    const node = checkchilds[0];
    treeData.value.forEach((v) => {
      if (!v.children.find((item) => item.id === node.id)) {
        v.disabled = true;
        v.children.forEach((j) => {
          j.disabled = true;
        });
      }
    });
  } else {
    treeData.value.forEach((v) => {
      v.disabled = false;
      v.children.forEach((j) => {
        j.disabled = false;
      });
    });
  }
  treeData.value = [...treeData.value];
  nextTick(() => {
    treeRef.value.setCheckedNodes(checks);
  });
};

const treeCheckChangeHandle = () => {
  emits("tree-check-change");
  treeCheckValid();
};

const treeNodeDelete = (data) => {
  ElMessageBox.confirm("确认删除该变量嘛？", "警告", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "删除成功",
      });
    })
    .catch(() => {});
};

const handleTabChange = (val) => {
  emits("type-change", val);
  const checks = treeRef.value.getCheckedNodes();
  nextTick(() => {
    treeRef.value.setCheckedNodes(checks);
  });
};

onMounted(() => {
  treeCheckValid();
});
</script>
<style lang="scss" scoped>
.echart-tree-container {
  background-color: #ffffff;
  border-radius: 5px;
  // margin-bottom: 10px;
  display: flex;
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
    span {
      font-size: 16px;
      font-weight: 700;
      color: #000;
    }
    div {
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
