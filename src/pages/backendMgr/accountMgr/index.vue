<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2024-01-05 21:23:24
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
      @sort-change="sortChange"
    >
      <template #toolbar>
        <el-row align="middle" :gutter="12">
          <el-col :span="2">
            <el-button type="primary" v-auth="'account_add'" @click="addRow"
              >新增</el-button
            >
          </el-col>
          <el-col :offset="14" :span="4">
            <el-select
              clearable
              v-model="state.searchFormData.projectId"
              placeholder="选择项目"
              style="width: 100%"
              @change="(e) => handleSearch(e, 'projectId')"
            >
              <el-option
                  v-for="item in globalState.projects"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-input
              clearable
              v-model="state.searchFormData.textQuery"
              placeholder="用户名/用户角色"
              :suffix-icon="Search"
              @keyup.enter="handleSearch"
            />
          </el-col>
        </el-row>
      </template>
      <template #operation="scope">
        <a
          v-auth="'account_edit'"
          class="table-operator-btn"
          @click="editRow(scope.row)"
          >编辑</a
        >
        <ProPopConfirm
          title="你确定要删除该账号嘛?"
          :icon="CircleCloseFilled"
          iconColor="red"
          @confirm="confirmDelete(scope.row)"
        >
          <a v-auth="'account_delete'" class="table-operator-btn">删除</a>
        </ProPopConfirm>
      </template>
    </ProTable>
    <ProDrawer
      :title="detailDrawerTitle"
      ref="detailDrawerRef"
      @confirm="confirmDetail"
    >
      <Detail ref="accountDetailRef" :initData="initDetailData" />
    </ProDrawer>
  </MainContentContainer>
</template>

<script setup lang="jsx">
import { ref, reactive } from "vue";
import { Search } from "@element-plus/icons-vue";
import ProTable from "@/components/ProTable.vue";
import ProDrawer from "@/components/ProDrawer.vue";
import Detail from "./detail.vue";
// import { COMMON_ROLE, LOCK_STATUS } from "@/constant";
import ProPopConfirm from "@/components/ProPopConfirm.vue";
import { CircleCloseFilled } from "@element-plus/icons-vue";
import MainContentContainer from "@/components/MainContentContainer.vue";
import useTable from '@/hooks/useTable.js';
import { deleteUserInfo, getList, updateUserInfo } from '@/api/backstageMng/userMng.js';
import { storeToRefs } from 'pinia';
import appStore from '@/store/index.js';
import { crudService } from '@/api/backstageMng/utils.js';

const { globalState } = storeToRefs(appStore.global);

const operateType = ref("");
const detailDrawerRef = ref();
const accountDetailRef = ref();
const detailDrawerTitle = ref("");
const initDetailData = ref({});

const state = reactive({
  searchFormData: { projectId: globalState.value.projectId, textQuery: "" },
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
} = useTable(getList, state.searchFormData, state.sortInfo);

getTableList();

const addRow = () => {
  operateType.value = "add";
  detailDrawerTitle.value = "新增账号信息";
  initDetailData.value = null;
  detailDrawerRef.value.open();
};

const editRow = (data) => {
  operateType.value = "edit";
  detailDrawerTitle.value = "编辑账号信息";
  initDetailData.value = data;
  detailDrawerRef.value.open();
};

/**
 * 更新人员信息
 * @return {Promise<void>}
 */
const confirmDetail = async () => {
  const res = await accountDetailRef.value.validate();
  if (res) {
    const updateRes = await updateUserInfo(res);
    if (updateRes) {
      detailDrawerRef.value.close();
      getTableList();
    }
  }
};

/**
 * 查询
 * @param value
 * @param type
 */
const handleSearch = (value, type) => {
  searchChange({
    ...state.searchFormData,
    ...(type === 'projectId' ? { projectId: value} : {}),
  });
};

/**
 * 删除用户信息
 * @param id
 * @return {Promise<void>}
 */
const confirmDelete = async ({ id }) => {
  await crudService(deleteUserInfo, { id }, getTableList)
};

const column = [
  {
    prop: "userName",
    label: "用户名",
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.userName}>
          <span className="table-first-col">{scope.row.userName}</span>
        </div>
      );
    },
  },
  {
    prop: "roleName",
    label: "用户角色",
    // render: (scope) => {
    //   const item = COMMON_ROLE.find((v) => v.value === scope.row.userRole);
    //   return item ? (
    //     <div className="text-overflow" title={item.label}>
    //       <span>{item.label}</span>
    //     </div>
    //   ) : (
    //     ""
    //   );
    // },
  },
  {
    prop: "projects",
    label: "绑定项目",
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.projects}>
          <span>{scope.row?.projects?.map(i => i?.name)?.join(',')}</span>
        </div>
      );
    },
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
  {
    prop: "status",
    label: "账号状态",
    render: (scope) => {
      const ifNormal = scope.row.status === "正常";
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span
            style={{ display: 'block', color: ifNormal ? "#00B050" : "#FA5555", fontSize: '6px', marginRight: '6px' }}
          >
            ●
          </span>
          <span style={{ display: 'block' }}>{scope.row.status}</span>
        </div>
      );
    },
  },
];

</script>
