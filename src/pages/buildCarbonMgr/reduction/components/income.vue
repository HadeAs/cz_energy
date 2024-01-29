<template>
  <MainContentContainer class="income-container">
    <Rate :searchData="state.searchFormData" />
    <ProTable
      multiple
      :hasPagination="false"
      :span-method="objectSpanMethod"
      :column="columns"
      :datasource="dataSource"
    >
      <template #toolbar>
        <el-form
          :inline="true"
          class="search-form"
          :model="state.searchFormData"
        >
          <el-form-item>
            <el-form-item label="时间间隔" style="margin-bottom: 0">
              <el-select v-model="state.searchFormData.duration" @change="e => handleSearchChange(e, 'duration')" placeholder="选择排放标准">
                <el-option v-for="item in tabs" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-form-item>
          <el-form-item>
            <el-form-item label="排放标准" style="margin-bottom: 0">
              <el-select v-model="state.searchFormData.standardId" @change="e => handleSearchChange(e, 'standardId')" placeholder="选择排放标准">
                <el-option v-for="item in staList" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-form-item>
        </el-form>
      </template>
      <template #operation="scope">
        <a class="table-operator-btn" @click="configRow(scope.row)" v-auth="''">配置</a>
      </template>
    </ProTable>
    <ProDrawer title="费用配置" ref="priceDrawerRef" @confirm="confirmPrice">
      <PriceConfig ref="priceConfigRef" :initData="state.initDetailData" />
    </ProDrawer>
  </MainContentContainer>
</template>
<script lang="jsx" setup name="InCome">
import { onMounted, reactive, ref, watch } from "vue";
import useTable from '@/hooks/useTable.js';
import { configReduce, getList } from '@/api/buildCarbon/reduce.js';
import { getCarbonStandardList } from '@/api/common.js';
import { storeToRefs } from 'pinia';
import appStore from '@/store/index.js';
import PriceConfig from './reduceConfig.vue';
import Rate from './rate.vue';

const tabs = [
  { label: "近一年", value: 1 },
  { label: "近三年", value: 2 },
  { label: "近五年", value: 5 },
];

const { globalState } = storeToRefs(appStore.global);

const columns = [
  {
    prop: "groupName",
    label: "碳减排组",
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.groupName}>
          <span className="table-first-col">{scope.row.groupName}</span>
        </div>
      );
    },
  },
  {
    prop: "name",
    label: "碳减排变量名",
  },
  {
    prop: "investCost",
    label: "投资单价(万元)",
  },
  {
    prop: "investAmount",
    label: "数量",
  },
  {
    prop: "investTotal",
    label: "总投资费用(万元)",
  },
  {
    prop: "carbonReduceAmount",
    label: "减碳量(t)",
  },
  {
    prop: "carbonCost",
    label: "碳单价(万元/t)",
  },
  {
    prop: "energySaveProfit",
    label: "节能收益(万元)",
  },
  {
    prop: "carbonReduceProfit",
    label: "减碳收益(万元)",
  },
];

const priceDrawerRef = ref();
const priceConfigRef = ref();
const staList = ref([]);

const state = reactive({
  searchFormData: {
    projectId: globalState.value.projectId,
    standardId: 1,
    duration: 1,
  },
  initDetailData: {},
  tableData: [],
  searchValue: 0,
});


const {
  dataSource,
  loading,
  searchChange,
  getTableList,
} = useTable(getList, state.searchFormData);

const objectSpanMethod = ({ row, column, rowIndex, columnIndex }) => {
  if (columnIndex === 1) {
    if (rowIndex % 3 === 0) {
      return {
        rowspan: 3,
        colspan: 1,
      };
    } else {
      return {
        rowspan: 0,
        colspan: 0,
      };
    }
  }
};

const configRow = (row) => {
  state.initDetailData = row;
  priceDrawerRef.value.open();
};

const confirmPrice = async () => {
  const res = await priceConfigRef.value.validate();
  const configRes = await configReduce({ ...res, projectId: globalState.value.projectId });
  if (configRes?.code === 200) {
    searchChange(state.searchFormData);
    priceDrawerRef.value.close();
  }
}

const handleSearchChange = (value, type) => {
  if (type === 'standardId') {
    state.searchFormData.standardId = value;
  }
  if (type === 'duration') {
    state.searchFormData.duration = value;
  }
  searchChange(state.searchFormData);
}

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
.income-container {
  :deep() {
    .el-table tbody tr td:first-child:not(.el-table-column--selection) .cell {
      padding-left: 12px !important;
    }
    .el-table__cell[rowspan="3"] {
      border-right: 1px solid var(--el-table-border-color);
      background: rgb(244, 247, 253) !important;
    }
  }
  .tool-bar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    .title {
      font-size: 16px;
      font-weight: 700;
    }
  }
}
</style>
