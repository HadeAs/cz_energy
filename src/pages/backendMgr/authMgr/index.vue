<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-16 23:46:57
 * @Description: 
-->
<template>
  <MainContentContainer>
    <ProTable
      :multiple="true"
      :column="column"
      :pageInfo="pageInfo"
      :datasource="dataSource"
      v-loading="loading"
      @page-change="pageChange"
      @sort-change="sortChange"
      @selection-change="selectionChange"
    >
      <template #toolbar>
        <el-row align="middle">
          <el-col :span="4">
            <el-button type="primary" v-auth="'auth_add'" @click="addRow"
              >新增</el-button
            >
            <el-button
              :disabled="!selectRows.length"
              v-auth="'auth_batch_delete'"
              @click="batchDelete"
              >批量删除</el-button
            >
          </el-col>
          <el-col :offset="16" :span="4">
            <el-input
              clearable
              v-model="state.searchFormData.textQuery"
              placeholder="角色名称"
              :suffix-icon="Search"
              @keyup.enter="handleSearch"
              v-auth="'auth_search'"
            />
          </el-col>
        </el-row>
      </template>
      <template #operation="scope">
        <a
          class="table-operator-btn"
          v-auth="'auth_edit'"
          @click="editRow(scope.row)"
          >编辑</a
        >
        <ProPopConfirm
          title="你确定要删除该角色嘛?"
          :icon="CircleCloseFilled"
          iconColor="red"
          @confirm="confirmDelete(scope.row)"
        >
          <a class="table-operator-btn" v-auth="'auth_delete'">删除</a>
        </ProPopConfirm>
        <a
          class="table-operator-btn"
          v-auth="'auth_distribute'"
          @click="distribute(scope.row)"
          >分配</a
        >
      </template>
    </ProTable>
    <ProDrawer
      :title="detailDrawerTitle"
      ref="detailDrawerRef"
      @confirm="confirmDetail"
    >
      <RoleDetail ref="roleDetailRef" :initData="initDetailData" />
    </ProDrawer>
    <ProDrawer
      title="分配权限"
      ref="distributeDrawerRef"
      @confirm="confirmDistribute"
    >
      <RoleDistribute ref="roleDistributeRef" :initData="initDetailData" />
    </ProDrawer>
  </MainContentContainer>
</template>

<script setup lang="jsx">
import { reactive, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import ProTable from "@/components/ProTable.vue";
import ProDrawer from "@/components/ProDrawer.vue";
import RoleDetail from "./detail.vue";
import RoleDistribute from "./distribute.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import ProPopConfirm from "@/components/ProPopConfirm.vue";
import { CircleCloseFilled } from "@element-plus/icons-vue";
import MainContentContainer from "@/components/MainContentContainer.vue";
import useTable from "@/hooks/useTable.js";
import {
  deleteRoleInfo,
  updateRoleInfo,
  getList,
  distributeRoleAuth,
} from "@/api/backstageMng/authMng.js";
import { crudService } from "@/api/backstageMng/utils.js";

const selectRows = ref([]);
const operateType = ref("");
const detailDrawerRef = ref();
const distributeDrawerRef = ref();
const roleDetailRef = ref();
const roleDistributeRef = ref();
const detailDrawerTitle = ref("");
const initDetailData = ref(null);

const state = reactive({
  searchFormData: { textQuery: "" },
  sortInfo: { prop: "updateTime", order: "descending" },
  currentData: {},
});

const {
  dataSource,
  loading,
  pageInfo,
  pageChange,
  sortChange,
  searchChange,
  getTableList,
} = useTable(getList, state.searchFormData, state.sortInfo, {}, 222);

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

const distribute = (rowData) => {
  //模拟当前角色的权限点
  state.currentData = rowData;
  initDetailData.value = rowData;
  distributeDrawerRef.value.open();
};

const confirmDistribute = async () => {
  const res = roleDistributeRef.value.getCheckResult();
  if (res) {
    await crudService(
      distributeRoleAuth,
      { id: state.currentData?.id, resourceIds: res },
      () => {
        getTableList();
        distributeDrawerRef.value.close();
      }
    );
  }
};

/**
 * 更新权限信息
 * @return {Promise<void>}
 */
const confirmDetail = async () => {
  const res = await roleDetailRef.value.validate();
  if (res) {
    await crudService(updateRoleInfo, res, () => {
      getTableList();
      detailDrawerRef.value.close();
    });
  }
};

const handleSearch = () => {
  searchChange(state.searchFormData);
};

/**
 * 删除权限信息
 * @param id
 * @return {Promise<void>}
 */
const confirmDelete = async ({ id }) => {
  await crudService(deleteRoleInfo, { id }, getTableList);
};

const selectionChange = (data) => {
  selectRows.value = data;
};

const batchDelete = () => {
  ElMessageBox.confirm("确认删除选中的内容？", "警告", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      // 批量删除逻辑
      datasource.value = datasource.value.filter((v) => {
        return !selectRows.value.find((item) => item.id === v.id);
      });
      ElMessage({
        type: "success",
        message: "删除成功",
      });
    })
    .catch(() => {});
};

const column = [
  {
    prop: "name",
    label: "角色名称",
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.name}>
          <span className="table-first-col">{scope.row.name}</span>
        </div>
      );
    },
  },
  {
    prop: "roleKey",
    label: "角色key",
  },
  {
    prop: "createTime",
    label: "创建时间",
    sortable: "custom",
  },
  {
    prop: "updateTime",
    label: "更新时间",
    sortable: "custom",
  },
  {
    prop: "description",
    label: "备注",
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
