<!--
 * @Author: ymZhang
 * @Date: 2023-12-26 17:28:58
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-12 21:42:22
 * @Description: 
-->
<template>
  <div style="height: 100%">
    <MainContentContainer>
      <ProTable
        multiple
        :column="column"
        :pageInfo="pageInfo"
        :default-sort="state.sortInfo"
        :datasource="dataSource"
        v-loading="loading"
        @page-change="pageChange"
        @selection-change="selectionChange"
        @sort-change="sortChange"
      >
        <template #toolbar>
          <el-row align="middle" :gutter="5">
            <el-col :span="6">
              <el-button
                type="primary"
                @click="addRow"
                v-auth="'group_index_add'"
                >新增</el-button
              >
              <el-button
                :disabled="!selectRows.length"
                @click="batchDelete"
                v-auth="'group_index_batch_delete'"
                >批量删除</el-button
              >
            </el-col>
            <el-col :span="18">
              <el-form
                class="search-form"
                :inline="true"
                :model="state.searchFormData"
              >
                <el-form-item>
                  <el-select
                    v-model="state.searchFormData.status"
                    placeholder="选择状态"
                    clearable
                    @change="handleSearchChange"
                  >
                    <el-option
                      v-for="item in DEVICE_STATUS"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-select
                    v-model="state.searchFormData.sysClassId"
                    placeholder="选择系统分类"
                    clearable
                    @change="handleSearchChange"
                  >
                    <el-option
                      v-for="item in state.classifyList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-select
                    v-model="state.searchFormData.projectId"
                    placeholder="选择项目"
                    @change="handleSearchChange"
                  >
                    <el-option
                      v-for="item in globalState.projects"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-input
                    v-model="state.searchFormData.textQuery"
                    clearable
                    placeholder="设备名称/资产编号"
                    :suffix-icon="Search"
                    @change="handleSearchChange"
                  />
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </template>
        <template #operation="scope">
          <a
            class="table-operator-btn"
            @click="editRow(scope.row)"
            v-auth="'group_index_edit'"
            >编辑</a
          >
          <ProPopConfirm
            title="你确定要删除该项目嘛?"
            :icon="CircleCloseFilled"
            iconColor="red"
            @confirm="deleteRow(scope.row)"
          >
            <a class="table-operator-btn" v-auth="'group_index_delete'">删除</a>
          </ProPopConfirm>
          <a
            class="table-operator-btn"
            v-auth="'group_index_connect'"
            @click="relateRow(scope.row)"
            >关联设备参数</a
          >
        </template>
      </ProTable>
    </MainContentContainer>
    <Detail
      ref="detailRef"
      :title="state.title"
      :data="state.currentData"
      :project-list="globalState.projects"
      :classify-list="state.classifyList"
      @submit="detailSubmit"
    />
    <Relate ref="relateRef" :data="state.paramData" @submit="relateSubmit" />
  </div>
</template>
<script lang="jsx" setup name="Group">
import { reactive, ref } from "vue";
import Detail from "./detail.vue";
import Relate from "./relate.vue";
import { Search, CircleCloseFilled } from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";
import appStore from "@/store";
import useTable from "@/hooks/useTable";
import {
  getList,
  batchDeleteDevice,
  deleteDevice,
  updateInfo,
  bindDevice,
} from "@/api/deviceMgr/deviceGroup";
import { getClassifyList } from "@/api/deviceMgr";
import { DEVICE_STATUS } from "@/constant";

const { globalState } = storeToRefs(appStore.global);
const detailRef = ref();
const relateRef = ref();
const state = reactive({
  searchFormData: {
    status: "",
    sysClassId: "",
    textQuery: "",
    projectId: globalState.value.projectId,
  },
  classifyList: [],
  unitList: [],
  sortInfo: { prop: "propertyNum", order: "descending" },
  currentData: {},
  paramData: {},
  title: "",
});

const column = [
  {
    prop: "name",
    label: "设备名称",
    width: 110,
    fixed: true,
    sortable: "custom",
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.name}>
          <span className="table-first-col">{scope.row.name}</span>
        </div>
      );
    },
  },
  {
    prop: "propertyNum",
    label: "资产编号",
    width: 120,
    sortable: "custom",
  },
  {
    prop: "projectName",
    label: "项目名称",
    width: 180,
    render: () => {
      const target = globalState.value.projects.find(
        (item) => item.id === state.searchFormData.projectId
      );
      return target?.name;
    },
  },
  {
    prop: "typeName",
    label: "设备类型",
    width: 100,
  },
  {
    prop: "sysClassName",
    label: "所属系统分类",
    width: 120,
  },
  {
    prop: "managerDept",
    label: "管理科室",
  },
  {
    prop: "managerName",
    label: "管理人",
  },
  {
    prop: "location",
    label: "设备位置",
    // width: 180,
  },
  {
    prop: "openTime",
    label: "启用时间",
    sortable: "custom",
    width: 180,
  },
  {
    prop: "status",
    label: "设备状态",
    sortable: "custom",
    width: 110,
    render: (scope) => {
      const status = scope.row.status;
      return (
        <div className="badge">
          <span
            style={{ fontSize: "5px" }}
            className={status === "启用" ? "success" : "danger"}
          >
            ●
          </span>
          {status}
        </div>
      );
    },
  },
];

const getDeviceClassifyList = async () => {
  const { data } = await getClassifyList({
    projectId: state.searchFormData.projectId,
  });
  if (data?.data) {
    state.classifyList = data.data;
  }
};

const {
  dataSource,
  loading,
  pageInfo,
  selectRows,
  pageChange,
  sortChange,
  searchChange,
  selectionChange,
  getTableList,
} = useTable(getList, state.searchFormData, state.sortInfo);

getTableList();
const handleSearchChange = () => {
  searchChange(state.searchFormData);
};

const batchDelete = () => {
  ElMessageBox.confirm("确认删除选中的内容？", "警告", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      const ids = selectRows.value.map((item) => item.id);
      const { code } = await batchDeleteDevice(
        state.searchFormData.projectId,
        ids
      );
      if (code === 200) {
        ElMessage({
          type: "success",
          message: "批量删除成功",
        });
        getTableList();
      }
    })
    .catch(() => {});
};

const addRow = () => {
  state.title = "新增";
  state.currentData = {};
  detailRef.value.open();
};
const editRow = (row) => {
  state.currentData = { ...row, projectId: state.searchFormData.projectId };
  state.title = "编辑";
  detailRef.value.open();
};
const relateRow = (row) => {
  state.paramData = { ...row, projectId: state.searchFormData.projectId };
  relateRef.value.open();
};
const deleteRow = async (row) => {
  const { code } = await deleteDevice(state.searchFormData.projectId, {
    id: row.id,
  });
  if (code === 200) {
    ElMessage.success("删除成功");
    getTableList();
  }
};
const detailSubmit = async (param) => {
  const { code } = await updateInfo(state.searchFormData.projectId, param);
  if (code === 200) {
    detailRef.value.close();
    ElMessage.success(`${state.title}成功`);
    getTableList();
  }
};
const relateSubmit = async (data, id) => {
  const { code } = await bindDevice(state.searchFormData.projectId, {
    id,
    deviceIds: data,
  });
  if (code === 200) {
    relateRef.value.close();
    ElMessage.success("绑定采集点成功");
    getTableList();
  }
};
</script>
<style lang="scss" scoped>
.search-form {
  text-align: right;
  :deep() {
    .el-form-item {
      margin-right: 15px;
      margin-bottom: 0;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
<style lang="scss">
.badge {
  display: flex;
  align-items: center;
  span {
    margin-right: 6px;
  }
  .success {
    color: #00b000;
  }
  .danger {
    color: #ff3333;
  }
}
</style>
