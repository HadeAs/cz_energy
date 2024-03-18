<!--
 * @Author: ymZhang
 * @Date: 2023-12-26 17:28:58
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-18 09:56:00
 * @Description: 
-->
<template>
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
            <el-button type="primary" @click="addRow" v-auth="'point_add'"
              >新增</el-button
            >
            <el-button
              :disabled="!selectRows.length"
              @click="batchDelete"
              v-auth="'point_batch_delete'"
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
                  placeholder="项目名称"
                  :suffix-icon="Search"
                  clearable
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
          v-auth="'point_edit'"
          >编辑</a
        >
        <ProPopConfirm
          title="你确定要删除该设备吗?"
          :icon="CircleCloseFilled"
          iconColor="red"
          @confirm="deleteRow(scope.row)"
        >
          <a class="table-operator-btn" v-auth="'point_delete'">删除</a>
        </ProPopConfirm>
      </template>
    </ProTable>
    <Detail
      ref="detailRef"
      :title="state.title"
      :data="state.currentData"
      @submit="detailSubmit"
    />
  </MainContentContainer>
</template>
<script lang="jsx" setup name="PointMgr">
import { reactive, ref } from "vue";
import Detail from "./components/detail.vue";
import { Search, CircleCloseFilled } from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";
import appStore from "@/store";
import useTable from "@/hooks/useTable";
import {
  getList,
  updatePoint,
  deletePoint,
  batchDeletePoint,
} from "@/api/deviceMgr/pointMgr";
import { ElMessage } from "element-plus";

const { globalState } = storeToRefs(appStore.global);
const detailRef = ref();
const state = reactive({
  searchFormData: {
    name: "",
    projectId: globalState.value.projectId,
    textQuery: "",
  },
  sortInfo: { prop: "id", order: "descending" },
  currentData: {},
  title: "",
});

const column = [
  {
    prop: "name",
    label: "点位名称",
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
    prop: "projectName",
    label: "所属项目",
    width: 180,
  },
  {
    prop: "gatewayName",
    label: "智能网关",
    width: 100,
  },
  {
    prop: "templateName",
    label: "单位",
    render: (scope) => {
      if (!scope.row.templateName) return null;
      return (
        <div>
          {scope.row.templateName}({scope.row.templateTag})
        </div>
      );
    },
    // width: 100,
  },
  {
    prop: "commNum",
    label: "通讯号",
    width: 90,
    sortable: "custom",
  },
  {
    prop: "period",
    label: "采集频率",
    sortable: "custom",
    width: 110,
    render: (scope) => `${scope.row.period ? scope.row.period + "分钟" : ""}`,
  },
  {
    prop: "maxThreshold",
    label: "最大阈值",
    width: 110,
    sortable: "custom",
  },
  {
    prop: "minThreshold",
    label: "最小阈值",
    width: 110,
    sortable: "custom",
  },
];

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
      const result = await batchDeletePoint(
        state.searchFormData.projectId,
        ids
      );

      if (result.code === 200) {
        ElMessage({
          type: "success",
          message: "删除成功",
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
const deleteRow = async (row) => {
  const { code } = await deletePoint(state.searchFormData.projectId, {
    id: row.id,
  });
  if (code === 200) {
    // ElMessage.success(`删除点位成功`);
    getTableList();
  }
};
const detailSubmit = async (param) => {
  const { projectId, ...rest } = param;
  const { code } = await updatePoint(projectId, rest);
  if (code === 200) {
    // ElMessage.success(`${rest.id ? "修改" : "新增"}点位成功`);
    detailRef.value.close();
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
