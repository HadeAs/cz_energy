<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2024-01-05 18:48:54
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
            <el-button v-auth="'platform_unit_add'" type="primary" @click="addRow">新增</el-button>
          </el-col>
          <el-col :offset="18" :span="4">
            <el-input
              clearable
              v-model="state.searchFormData.textQuery"
              placeholder="单位名称"
              :suffix-icon="Search"
              @keyup.enter="handleSearch"
            />
          </el-col>
        </el-row>
      </template>
      <template #operation="scope">
        <a class="table-operator-btn" v-auth="'platform_unit_edit'" @click="editRow(scope.row)">编辑</a>
        <ProPopConfirm
          title="你确定要删除该单位嘛?"
          :icon="CircleCloseFilled"
          iconColor="red"
          @confirm="confirmDelete(scope.row)"
        >
          <a class="table-operator-btn" v-auth="'platform_unit_delete'">删除</a>
        </ProPopConfirm>
      </template>
    </ProTable>
    <ProDrawer
      :title="detailDrawerTitle"
      ref="detailDrawerRef"
      @confirm="confirmDetail"
    >
      <UnitDetail ref="unitDetailRef" :initData="initDetailData" />
    </ProDrawer>
  </MainContentContainer>
</template>

<script setup lang="jsx">
import { ref, reactive } from "vue";
import { Search } from "@element-plus/icons-vue";
import ProTable from "@/components/ProTable.vue";
import ProDrawer from "@/components/ProDrawer.vue";
import UnitDetail from "./components/unitDetail.vue";
import ProPopConfirm from "@/components/ProPopConfirm.vue";
import { CircleCloseFilled } from "@element-plus/icons-vue";
import MainContentContainer from "@/components/MainContentContainer.vue";
import useTable from '@/hooks/useTable.js';
import { getDeviceTemplateList, updateDeviceTemplate, deleteDeviceTemplate } from '@/api/backstageMng/platform.js';
import { crudService } from '@/api/backstageMng/utils.js';

const operateType = ref("");
const detailDrawerRef = ref();
const unitDetailRef = ref();
const detailDrawerTitle = ref("");
const initDetailData = ref(null);

const state = reactive({
  searchFormData: { textQuery: "" },
  sortInfo: { prop: "id", order: "descending" },
  currentData: {},
  projects: [],
});

const {
  dataSource,
  loading,
  pageInfo,
  pageChange,
  sortChange,
  searchChange,
  getTableList,
} = useTable(getDeviceTemplateList, state.searchFormData, state.sortInfo);

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
  const res = await unitDetailRef.value.validate();
  if (res) {
    await crudService(updateDeviceTemplate, res, () => {
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

const column = [
  {
    prop: "name",
    label: "单位名称",
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.name}>
          <span className="table-first-col">{scope.row.name}</span>
        </div>
      );
    },
  },
  {
    prop: "tag",
    label: "符号",
  },
  {
    prop: "description",
    label: "备注",
    width: 280,
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.description}>
          <span>{scope.row.description}</span>
        </div>
      );
    },
  },
];

</script>
