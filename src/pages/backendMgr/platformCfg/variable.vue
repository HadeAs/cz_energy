<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2024-01-05 18:49:00
 * @Description: 
-->
<template>
  <MainContentContainer>
    <ProTable
      :column="column"
      :pageInfo="pageInfo"
      :datasource="dataSource"
      v-loading="loading"
      @page-change="pageChange"
    >
      <template #toolbar>
        <el-row align="middle" :gutter="5">
          <el-col :span="2">
            <el-button
              type="primary"
              v-auth="'platform_variable_add'"
              @click="addRow"
              >新增</el-button
            >
          </el-col>
          <el-col :offset="18" :span="4">
            <el-input
              clearable
              v-model="state.searchFormData.textQuery"
              placeholder="变量名称"
              :suffix-icon="Search"
              @keyup.enter="handleSearch"
            />
          </el-col>
        </el-row>
      </template>
      <template #operation="scope">
        <a
          class="table-operator-btn"
          v-auth="'platform_variable_edit'"
          @click="editRow(scope.row)"
          >编辑</a
        >
        <ProPopConfirm
          title="你确定要删除该变量嘛?"
          :icon="CircleCloseFilled"
          iconColor="red"
          @confirm="confirmDelete(scope.row)"
        >
          <a class="table-operator-btn" v-auth="'platform_variable_delete'"
            >删除</a
          >
        </ProPopConfirm>
      </template>
    </ProTable>
    <ProDrawer
      :title="detailDrawerTitle"
      ref="detailDrawerRef"
      @confirm="confirmDetail"
    >
      <VariableDetail ref="variableDetailRef" :vTypeData="state.variablesType" :initData="initDetailData" />
    </ProDrawer>
  </MainContentContainer>
</template>

<script setup lang="jsx">
import { ref, onMounted, reactive } from "vue";
import { ElTag } from "element-plus";
import { VARIABLE_TYPE } from "@/constant";
import { Search } from "@element-plus/icons-vue";
import ProTable from "@/components/ProTable.vue";
import ProDrawer from "@/components/ProDrawer.vue";
import VariableDetail from "./components/variableDetail.vue";
import ProPopConfirm from "@/components/ProPopConfirm.vue";
import { CircleCloseFilled } from "@element-plus/icons-vue";
import MainContentContainer from "@/components/MainContentContainer.vue";
import useTable from '@/hooks/useTable.js';
import {
  updateStatisticsType,
  getStatisticsTypeList,
  deleteDeviceTemplate,
} from '@/api/backstageMng/platform.js';
import { crudService } from '@/api/backstageMng/utils.js';
import { getBuildingType, getVariablesByLevel } from '@/api/common.js';

const operateType = ref("");
const detailDrawerRef = ref();
const variableDetailRef = ref();
const detailDrawerTitle = ref("");
const initDetailData = ref(null);

const COLOR_MAP = {
  1: "",
  2: "success",
  3: "warning",
};

const state = reactive({
  searchFormData: { textQuery: "" },
  currentData: {},
  sortInfo: { prop: "id", order: "descending" },
  projects: [],
  variablesType: [],
});

const {
  dataSource,
  loading,
  pageInfo,
  pageChange,
  sortChange,
  searchChange,
  getTableList,
} = useTable(getStatisticsTypeList, state.searchFormData, state.sortInfo);

getTableList();

const addRow = () => {
  operateType.value = "add";
  detailDrawerTitle.value = "新增";
  initDetailData.value = null;
  detailDrawerRef.value.open();
};

const editRow = (data) => {
  operateType.value = "edit";
  detailDrawerTitle.value = "编辑";
  initDetailData.value = data;
  detailDrawerRef.value.open();
};

const confirmDetail = async () => {
  const res = await variableDetailRef.value.validate();
  if (res) {
    await crudService(updateStatisticsType, res, () => {
      getTableList();
      detailDrawerRef.value.close();
    })
  }
};

const handleSearch = () => {
  searchChange(state.searchFormData)
};

const confirmDelete = async ({ id }) => {
  await crudService(deleteDeviceTemplate, { id }, getTableList)
};

onMounted(async () => {
  getVariablesByLevel().then(({ data }) => {
    if (data?.data) {
      state.variablesType = data?.data;
    }
  })
});

const column = [
  {
    prop: "parentName",
    label: "一级变量",
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.parentName}>
          <span className="table-first-col">{scope.row.parentName}</span>
        </div>
      );
    },
  },
  {
    prop: "level",
    label: "变量类型",
    render: (scope) => {
      // 临时用 level
      const item = state.variablesType.find((v) => v.level === scope.row.level);
      return item ? (
        <ElTag type={COLOR_MAP[item.value]}>
          <span>{item.name}</span>
        </ElTag>
      ) : (
        ""
      );
    },
  },
  {
    prop: "name",
    label: "二级变量",
  },
];

</script>
