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
        <el-form
          class="search-form"
          :inline="true"
          :model="state.searchFormData"
        >
          <el-form-item>
            <el-form-item label="排放标准" style="margin-bottom: 0">
              <el-select v-model="state.searchFormData.standardId" @change="handleSearchChange" placeholder="选择排放标准">
                <el-option v-for="item in staList" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-form-item>
        </el-form>
      </template>
      <template #operation="scope">
        <a class="table-operator-btn" @click="editRow(scope.row)" v-auth="''">配置</a>
      </template>
    </ProTable>
    <Detail
      ref="detailRef"
      :title="state.title"
      :data="state.currentData"
      :staList="staList"
      @submit="detailSubmit"
    />
  </MainContentContainer>
</template>
<script lang="jsx" setup name="factorMng">
import { reactive, ref, onMounted, watch } from "vue";
import Detail from "./detail.vue";
// import { CircleCloseFilled } from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";
import appStore from "@/store";
import useTable from "@/hooks/useTable";
import { configCarbon, getList } from '@/api/buildCarbon/emission.js';
import { getCarbonStandardList } from '@/api/common.js';

const { globalState } = storeToRefs(appStore.global);

const staList = ref([]);
const detailRef = ref();
const state = reactive({
  searchFormData: {
    projectId: globalState.value.projectId,
  },
  sortInfo: { prop: "id", order: "descending" },
  currentData: {},
  title: "",
  carbonTpyList: [],
});

const column = [
  {
    prop: "name",
    label: "碳排放因子",
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
    prop: "tag",
    label: "符号",
  },
  {
    prop: "value",
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

const handleSearchChange = e => {
  state.searchFormData.standardId = e;
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
// const deleteRow = async (row) => {
//   const { code } = await deletePoint(state.searchFormData.projectId, {
//     id: row.id,
//   });
//   if (code === 200) {
//     // ElMessage.success(`删除点位成功`);
//     getTableList();
//   }
// };
const detailSubmit = async (param) => {
  const { code } = await configCarbon({
    projectId: state.searchFormData.projectId,
    carbonStatisticsId: state.currentData.id,
    ...param,
  });
  if (code === 200) {
    // ElMessage.success(`${rest.id ? "修改" : "新增"}点位成功`);
    detailRef.value.close();
    searchChange(state.searchFormData);
  }
};
onMounted(async () => {
  const staRes = await getCarbonStandardList();
  if (staRes?.data?.data) {
    state.searchFormData.standardId = staRes?.data?.data?.[0]?.id;
    staList.value = staRes?.data?.data || [];
  }
  searchChange(state.searchFormData);
})

watch(
  () => globalState.value.projectId,
  (id) => {
    state.searchFormData.projectId = id;
    searchChange(state.searchFormData);
  }
);

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
