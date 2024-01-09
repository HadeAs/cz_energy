<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2024-01-05 18:48:44
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
              v-auth="'platform_energy_add'"
              @click="addRow"
              >新增</el-button
            >
          </el-col>
          <el-col :offset="18" :span="4">
            <el-input
              clearable
              v-model="state.searchFormData.textQuery"
              placeholder="系统分类名称"
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
          <a class="table-operator-btn" v-auth="'platform_energy_delete'"
            >删除</a
          >
        </ProPopConfirm>
      </template>
    </ProTable>
    <ProDrawer title="新增" ref="detailDrawerRef" @confirm="confirmDetail">
      <EnergyDetail ref="energyDetailRef" :initData="initDetailData" />
    </ProDrawer>
  </MainContentContainer>
</template>

<script setup lang="jsx">
import { ref, onMounted, reactive } from "vue";
import { Search } from "@element-plus/icons-vue";
import ProTable from "@/components/ProTable.vue";
import ProDrawer from "@/components/ProDrawer.vue";
import EnergyDetail from "./components/energyDetail.vue";
import ProPopConfirm from "@/components/ProPopConfirm.vue";
import { CircleCloseFilled } from "@element-plus/icons-vue";
import MainContentContainer from "@/components/MainContentContainer.vue";
import useTable from '@/hooks/useTable.js';
import {
  updateSysClass,
  deleteSysClass,
  getSysClassList,
} from '@/api/backstageMng/platform.js';
import { crudService } from '@/api/backstageMng/utils.js';

const detailDrawerRef = ref();
const energyDetailRef = ref();
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
} = useTable(getSysClassList, state.searchFormData, state.sortInfo);

getTableList();

const addRow = () => {
  initDetailData.value = null;
  detailDrawerRef.value.open();
};

const confirmDetail = async () => {
  const res = await energyDetailRef.value.validate();
  if (res) {
    await crudService(updateSysClass, res, () => {
      getTableList();
      detailDrawerRef.value.close();
    })
  }
};

const handleSearch = () => {
  searchChange(state.searchFormData)
};

const confirmDelete = async ({ id }) => {
  await crudService(deleteSysClass, { id }, getTableList)
};

const column = [
  {
    prop: "name",
    label: "系统分类名称",
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
