<!--
 * @Author: ymZhang
 * @Date: 2024-01-17 12:04:30
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-17 15:42:46
 * @Description: 
-->
<template>
  <div class="global-cfg-container">
    <MainContentContainer v-for="item in state.list" :key="item.type">
      <div class="title">
        <el-icon class="pic-icon"><Platform /></el-icon>
        <span>{{ item.name }}</span>
        <el-button link type="primary" @click="handleAdd(item)">新增</el-button>
      </div>
      <div class="config-item" v-for="data in item.data" :key="data.id">
        <div class="config-item-title">
          <span>{{ data.name }}</span>
          <span>
            <a class="table-operator-btn" @click="handleEdit(item, data)"
              >编辑</a
            >
            <a class="table-operator-btn" @click="handleDelete(data)">删除</a>
          </span>
        </div>
        <div class="config-item-content">
          {{ data.name }} = {{ getFuncName(data.function) }} (
          <el-tag
            effect="dark"
            v-for="v in data.deviceNameList"
            :key="`${data.id}_${v.id}`"
          >
            {{ v.name }}
          </el-tag>
          )
        </div>
      </div>
    </MainContentContainer>
    <ConfigDetail
      ref="detailRef"
      :title="state.title"
      :data="state.detail"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { Platform } from "@element-plus/icons-vue";
import MainContentContainer from "@/components/MainContentContainer.vue";
import ConfigDetail from "./configDetail.vue";
import { storeToRefs } from "pinia";
import appStore from "@/store";
import {
  queryData,
  deleteDataInfo,
  updateDataInfo,
} from "@/api/operationMgr/workMonitor";
import { COMMON_FUNCTION_LIST } from "@/constant";

const { globalState } = storeToRefs(appStore.global);
const detailRef = ref();
const state = reactive({
  list: [
    {
      type: 1,
      name: "配电监测项数据配置",
      data: [],
    },
    {
      type: 2,
      name: "用水监测项数据配置",
      data: [],
    },
  ],
  detail: {},
  title: "",
});

const getFuncName = (func) => {
  const target = COMMON_FUNCTION_LIST.find((item) => item.id === func);
  return target?.name;
};
const queryDatas = async () => {
  const { data } = await queryData({ projectId: globalState.value.projectId });
  if (data?.data) {
    const powerData = [];
    const waterData = [];
    data.data.forEach((item) => {
      if (item.type === 1) {
        powerData.push(item);
      } else if (item.type === 2) {
        waterData.push(item);
      }
    });
    state.list[0].data = powerData;
    state.list[1].data = waterData;
  }
};
queryDatas();

const handleAdd = (item) => {
  state.title = "新增数据项";
  state.detail = {
    type: item.type,
    projectId: globalState.value.projectId,
  };
  detailRef.value.open();
};
const handleEdit = (item, data) => {
  state.title = "编辑数据项";
  state.detail = {
    type: item.type,
    id: data.id,
    name: data.name,
    projectId: globalState.value.projectId,
    function: data.function,
    deviceIds: (data.deviceNameList || []).map((v) => v.id),
  };
  detailRef.value.open();
};
const handleDelete = ({ id }) => {
  ElMessageBox.confirm("确认删除该数据项吗？", "警告", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      const { code } = await deleteDataInfo(globalState.value.projectId, {
        id,
      });
      if (code === 200) {
        queryDatas();
        ElMessage({
          type: "success",
          message: "删除成功",
        });
      }
    })
    .catch(() => {});
};

const handleSubmit = async (data) => {
  const { projectId, ...rest } = data;
  const { code } = await updateDataInfo(projectId, rest);
  if (code === 200) {
    queryDatas();
    ElMessage({
      type: "success",
      message: `${rest.id ? "修改" : "添加"}数据项成功`,
    });
    detailRef.value.close();
  }
};

watch(
  () => globalState.value.projectId,
  () => {
    queryDatas();
  }
);
</script>
<style lang="scss" scoped>
.global-cfg-container {
  > div {
    margin-bottom: 10px;
    overflow: unset !important;
    height: auto !important;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .title {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    a {
    }
    span {
      margin-left: 10px;
      margin-right: 10px;
      font-size: 16px;
      font-weight: bold;
    }
    .pic-icon {
      font-size: 18px;
      color: #2985f7;
    }
  }
  .config-item {
    margin-bottom: 15px;
    border: 1px solid #e3e3e3;
    border-radius: 3px;
    .config-item-title {
      padding: 10px 20px;
      background-color: rgba(236, 241, 249, 1);
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 14px;
        font-weight: bold;
      }
      a {
        // float: right;
        color: rgba(255, 48, 0);
        cursor: pointer;
        &:last-child {
          margin-left: 10px;
        }
      }
    }
    .config-item-content {
      padding: 20px;
      :deep() {
        .el-tag {
          margin-right: 6px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>
