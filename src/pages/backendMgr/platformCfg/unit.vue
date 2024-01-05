<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2024-01-05 18:48:54
 * @Description: 
-->
<template>
  <MainContentContainer>
    <ProTable
      :column="column"
      :pageInfo="pageInfo"
      :datasource="datasource"
      v-loading="loading"
      @page-change="pageChange"
    >
      <template #toolbar>
        <el-row align="middle" :gutter="5">
          <el-col :span="2">
            <el-button
              v-auth="'platform_unit_add'"
              type="primary"
              @click="addRow"
              >新增</el-button
            >
          </el-col>
          <el-col :offset="18" :span="4">
            <el-input
              clearable
              v-model="unitName"
              placeholder="单位名称"
              :suffix-icon="Search"
              @keyup.enter="handleSearch"
            />
          </el-col>
        </el-row>
      </template>
      <template #operation="scope">
        <a
          class="table-operator-btn"
          v-auth="'platform_unit_edit'"
          @click="editRow(scope.row)"
          >编辑</a
        >
        <ProPopConfirm
          title="你确定要删除该单位嘛?"
          :icon="CircleCloseFilled"
          iconColor="red"
          @confirm="confirmDelete(scope.row)"
        >
          <a class="table-operator-btn" v-auth="'platform_unit_delete'">删除</a>
        </ProPopConfirm>
      </template>
    </ProTable>
    <ProDrawer
      :title="detailDrawerTitle"
      ref="detailDrawerRef"
      @confirm="confirmDetail"
    >
      <UnitDetail ref="unitDetailRef" :initData="initDetailData" />
    </ProDrawer>
  </MainContentContainer>
</template>

<script setup lang="jsx">
import { ref, onMounted } from "vue";
import { Search } from "@element-plus/icons-vue";
import ProTable from "@/components/ProTable.vue";
import ProDrawer from "@/components/ProDrawer.vue";
import UnitDetail from "./components/unitDetail.vue";
import ProPopConfirm from "@/components/ProPopConfirm.vue";
import { CircleCloseFilled } from "@element-plus/icons-vue";
import MainContentContainer from "@/components/MainContentContainer.vue";

const unitName = ref("");
const loading = ref(false);
const datasource = ref([]);
const operateType = ref("");
const detailDrawerRef = ref();
const unitDetailRef = ref();
const detailDrawerTitle = ref("");
const initDetailData = ref(null);
const pageInfo = ref({
  total: 12,
  currentPage: 1,
  pageSize: 15,
  pageSizes: [10, 15, 20, 50],
});

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

const confirmDetail = async () => {
  const res = await unitDetailRef.value.validate();
  if (res) {
    // 配置新增/编辑逻辑
    if (operateType.value === "add") {
      datasource.value.push(res);
    } else {
      const idx = datasource.value.findIndex((v) => v.id === res.id);
      datasource.value.splice(idx, 1, res);
    }
    datasource.value = [...datasource.value];
    detailDrawerRef.value.close();
  }
};

const handleSearch = () => {
  console.log(unitName.value);
};

const confirmDelete = (data) => {
  // 配置删除逻辑
  const idx = datasource.value.findIndex((v) => v.id === data.id);
  datasource.value.splice(idx, 1);
  datasource.value = [...datasource.value];
};

const pageChange = (currentPage, pageSize) => {
  console.log(currentPage, pageSize);
};

const column = [
  {
    prop: "unitName",
    label: "单位名称",
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.unitName}>
          <span className="table-first-col">{scope.row.unitName}</span>
        </div>
      );
    },
  },
  {
    prop: "symbol",
    label: "符号",
  },
  {
    prop: "remark",
    label: "备注",
    width: 280,
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.remark}>
          <span>{scope.row.remark}</span>
        </div>
      );
    },
  },
];

onMounted(async () => {
  loading.value = true;
  const res = await new Promise((resolve) => {
    setTimeout(() => {
      loading.value = false;
      resolve([
        {
          id: "1",
          unitName: "电量",
          remark: "--",
          symbol: "kWh",
        },
        {
          id: "2",
          unitName: "碳排放量",
          remark: "--",
          symbol: "tCO2 或kgCO2",
        },
        {
          id: "3",
          unitName: "碳排放强度",
          remark: "--",
          symbol: "kgCO2/（㎡·a）",
        },
        {
          id: "4",
          unitName: "燃气量",
          remark: "--",
          symbol: "m³",
        },
        {
          id: "5",
          unitName: "热量",
          remark: "--",
          symbol: "kWh",
        },
        {
          id: "6",
          unitName: "冷量",
          remark: "--",
          symbol: "kWh",
        },
        {
          id: "7",
          unitName: "频率",
          remark: "--",
          symbol: "Hz",
        },
        {
          id: "8",
          unitName: "温度",
          remark: "--",
          symbol: "℃",
        },
        {
          id: "9",
          unitName: "压力",
          remark: "--",
          symbol: "bar",
        },
        {
          id: "10",
          unitName: "液位",
          remark: "--",
          symbol: "m",
        },
        {
          id: "11",
          unitName: "水量",
          remark: "--",
          symbol: "m³",
        },
        {
          id: "12",
          unitName: "百分比",
          remark: "--",
          symbol: "%",
        },
      ]);
    }, 1000);
  });
  datasource.value = res;
});
</script>
