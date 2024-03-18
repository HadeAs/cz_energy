<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-17 22:49:53
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
            <el-button type="primary" v-auth="'comm_add'" @click="addRow"
              >新增</el-button
            >
          </el-col>
          <el-col :offset="18" :span="4">
            <el-input
              clearable
              v-model="state.searchFormData.textQuery"
              placeholder="网关名称"
              :suffix-icon="Search"
              @keyup.enter="handleSearch"
              v-auth="'comm_search'"
            />
          </el-col>
        </el-row>
      </template>
      <template #operation="scope">
        <a
          class="table-operator-btn"
          v-auth="'comm_edit'"
          @click="editRow(scope.row)"
          >编辑</a
        >
        <ProPopConfirm
          title="你确定要删除该配置嘛?"
          :icon="CircleCloseFilled"
          iconColor="red"
          @confirm="confirmDelete(scope.row)"
        >
          <a class="table-operator-btn" v-auth="'comm_delete'">删除</a>
        </ProPopConfirm>
      </template>
    </ProTable>
    <ProDrawer
      :title="detailDrawerTitle"
      ref="detailDrawerRef"
      @confirm="confirmDetail"
    >
      <Detail ref="commDetailRef" :initData="initDetailData" />
    </ProDrawer>
  </MainContentContainer>
</template>

<script setup lang="jsx">
import { ref, onMounted, reactive } from "vue";
import { Search } from "@element-plus/icons-vue";
import ProTable from "@/components/ProTable.vue";
import ProDrawer from "@/components/ProDrawer.vue";
import Detail from "./detail.vue";
import ProPopConfirm from "@/components/ProPopConfirm.vue";
import { CircleCloseFilled } from "@element-plus/icons-vue";
import MainContentContainer from "@/components/MainContentContainer.vue";
import useTable from "@/hooks/useTable.js";
import {
  getList,
  updateGateway,
  deleteGateway,
} from "@/api/backstageMng/gateway.js";
import { crudService } from "@/api/backstageMng/utils.js";

const detailDrawerRef = ref();
const commDetailRef = ref();
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
} = useTable(getList, state.searchFormData, state.sortInfo, {}, 241);

getTableList();

const addRow = () => {
  detailDrawerTitle.value = "新增通信配置";
  initDetailData.value = null;
  detailDrawerRef.value.open();
};

const editRow = (data) => {
  detailDrawerTitle.value = "编辑通信配置";
  initDetailData.value = data;
  detailDrawerRef.value.open();
};

const confirmDetail = async () => {
  const res = await commDetailRef.value.validate();
  if (res) {
    await crudService(updateGateway, res, () => {
      getTableList();
      detailDrawerRef.value.close();
    });
  }
};

const handleSearch = () => {
  searchChange(state.searchFormData);
};

const confirmDelete = async ({ id }) => {
  await crudService(deleteGateway, { id }, getTableList);
};

const column = [
  {
    prop: "address",
    label: "网关ID",
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.address}>
          <span className="table-first-col">{scope.row.address}</span>
        </div>
      );
    },
  },
  {
    prop: "name",
    label: "网关名称",
  },
  {
    prop: "version",
    label: "网关版本",
  },
  {
    prop: "communicationInterface",
    label: "通讯接口",
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
