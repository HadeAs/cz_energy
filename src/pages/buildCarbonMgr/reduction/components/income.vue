<template>
  <MainContentContainer class="income-container">
    <div class="tool-bar">
      <div class="title">减碳投资收益（年）</div>
      <div class="right-title">
        <el-select
          v-model="state.searchValue"
          placeholder="选择项目"
          @change="handleSearchChange"
        >
          <el-option
            v-for="item in opts"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>
    </div>
    <el-table
      :data="state.tableData"
      :span-method="objectSpanMethod"
      stripe
      row-key="id"
    >
      <el-table-column prop="name" label="" width="150" align="center">
        <template #default="scope">
          <div className="text-overflow" :title="scope.row.name">
            <span className="table-first-col">{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="project" label="项目" />
      <el-table-column prop="unitPrice" label="投资单价" />
      <el-table-column prop="num" label="数量" />
      <el-table-column prop="total" label="总投资费用(万元)" width="150" />
      <el-table-column prop="reduction" label="减碳量" />
      <el-table-column prop="carbonUnit" label="碳单价" />
      <el-table-column prop="energySave" label="节能(直接)收益" width="150" />
      <el-table-column prop="carbonSave" label="减碳收益" />
    </el-table>
  </MainContentContainer>
</template>
<script setup name="InCome">
import { reactive } from "vue";

const TEST_DATA = [
  {
    id: 0,
    name: "可再生能源",
    project: "光伏发电",
    unitPrice: "5.6",
    num: 12,
    total: "100",
    reduction: "0.695",
    carbonUnit: "0.695",
    energySave: "0.695",
    carbonSave: "0.695",
  },
  {
    id: 1,
    name: "可再生能源",
    project: "光热",
    unitPrice: "5.62",
    num: 15,
    total: "100",
    reduction: "0.156",
    carbonUnit: "0.156",
    energySave: "0.156",
    carbonSave: "0.156",
  },
  {
    id: 2,
    name: "可再生能源",
    project: "风力发电",
    unitPrice: "1.23",
    num: 45,
    total: "100",
    reduction: "0.24",
    carbonUnit: "0.24",
    energySave: "0.24",
    carbonSave: "0.24",
  },
  {
    id: 3,
    name: "节能改造",
    project: "围护结构",
    unitPrice: "2.36",
    num: 56,
    total: "100",
    reduction: "0.36",
    carbonUnit: "0.36",
    energySave: "0.36",
    carbonSave: "0.36",
  },
  {
    id: 4,
    name: "节能改造",
    project: "空调系统",
    unitPrice: "10.2",
    num: 58,
    total: "100",
    reduction: "0.24",
    carbonUnit: "0.24",
    energySave: "0.24",
    carbonSave: "0.24",
  },
  {
    id: 5,
    name: "节能改造",
    project: "照明系统",
    unitPrice: "2.3",
    num: 20,
    total: "100",
    reduction: "0.36",
    carbonUnit: "0.36",
    energySave: "0.36",
    carbonSave: "0.36",
  },
];
const opts = [
  { id: 0, name: "国家推荐值" },
  { id: 1, name: "地方推荐值" },
];
const state = reactive({
  tableData: TEST_DATA,
  searchValue: 0,
});
const objectSpanMethod = ({ row, column, rowIndex, columnIndex }) => {
  if (columnIndex === 0) {
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
const handleSearchChange = () => {};
</script>
<style lang="scss" scoped>
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
