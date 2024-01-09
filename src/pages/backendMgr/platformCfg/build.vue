<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2024-01-05 18:48:36
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
              v-auth="'platform_build_add'"
              @click="addRow"
              >新增</el-button
            >
          </el-col>
          <el-col :offset="18" :span="4">
            <el-input
              clearable
              v-model="state.searchFormData.textQuery"
              placeholder="建筑类型名称"
              :suffix-icon="Search"
              @keyup.enter="handleSearch"
            />
          </el-col>
        </el-row>
      </template>
      <template #operation="scope">
        <ProPopConfirm
          title="你确定要删除该内容嘛?"
          :icon="CircleCloseFilled"
          iconColor="red"
          @confirm="confirmDelete(scope.row)"
        >
          <a class="table-operator-btn" v-auth="'platform_build_delete'"
            >删除</a
          >
        </ProPopConfirm>
      </template>
    </ProTable>
    <ProDrawer title="新增" ref="detailDrawerRef" @confirm="confirmDetail">
      <BuildDetail ref="buildDetailRef" :initData="initDetailData" />
    </ProDrawer>
  </MainContentContainer>
</template>

<script setup lang="jsx">
import { ref, reactive } from "vue";
import { Search } from "@element-plus/icons-vue";
import ProTable from "@/components/ProTable.vue";
import ProDrawer from "@/components/ProDrawer.vue";
import BuildDetail from "./components/buildDetail.vue";
import ProPopConfirm from "@/components/ProPopConfirm.vue";
import { CircleCloseFilled } from "@element-plus/icons-vue";
import MainContentContainer from "@/components/MainContentContainer.vue";
import useTable from '@/hooks/useTable.js';
import {
  getBuildingTypeList,
  updateBuildingType,
  deleteBuildingType,
} from '@/api/backstageMng/platform.js';
import { crudService } from '@/api/backstageMng/utils.js';

const detailDrawerRef = ref();
const buildDetailRef = ref();
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
} = useTable(getBuildingTypeList, state.searchFormData, state.sortInfo);

getTableList();

const addRow = () => {
  initDetailData.value = null;
  detailDrawerRef.value.open();
};

const confirmDetail = async () => {
  const res = await buildDetailRef.value.validate();
  if (res) {
    await crudService(updateBuildingType, res, () => {
      getTableList();
      detailDrawerRef.value.close();
    })
  }
};

const handleSearch = () => {
  searchChange(state.searchFormData)
};

const confirmDelete = async ({ id }) => {
  await crudService(deleteBuildingType, { id }, getTableList)
};

const column = [
  {
    prop: "name",
    label: "建筑类型名称",
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.name}>
          <span className="table-first-col">{scope.row.name}</span>
        </div>
      );
    },
  },
];

</script>
