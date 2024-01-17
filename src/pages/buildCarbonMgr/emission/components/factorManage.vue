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
            <el-button type="primary" @click="addRow" v-auth="''"
              >新增</el-button
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
        <a class="table-operator-btn" @click="editRow(scope.row)" v-auth="''"
          >编辑</a
        >
        <ProPopConfirm
          title="你确定要删除该内容吗?"
          :icon="CircleCloseFilled"
          iconColor="red"
          @confirm="deleteRow(scope.row)"
        >
          <a class="table-operator-btn" v-auth="''">删除</a>
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
import Detail from "./detail.vue";
import { Search, CircleCloseFilled } from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";
import appStore from "@/store";
import useTable from "@/hooks/useTable";
import { getList, updatePoint, deletePoint } from "@/api/deviceMgr/pointMgr";
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
    label: "碳排放因子",
    width: 200,
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
    prop: "unit",
    label: "符号",
    width: 110,
  },
  {
    prop: "label",
    label: "值",
  },
];

const {
  dataSource,
  loading,
  pageInfo,
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
    ElMessage.success(`删除点位成功`);
    getTableList();
  }
};
const detailSubmit = async (param) => {
  const { projectId, ...rest } = param;
  const { code } = await updatePoint(projectId, rest);
  if (code === 200) {
    ElMessage.success(`${rest.id ? "修改" : "新增"}点位成功`);
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
