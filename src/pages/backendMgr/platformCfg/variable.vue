<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2024-01-05 18:49:00
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
              type="primary"
              v-auth="'platform_variable_add'"
              @click="addRow"
              >新增</el-button
            >
          </el-col>
          <el-col :offset="18" :span="4">
            <el-input
              clearable
              v-model="varName"
              placeholder="变量名称"
              :suffix-icon="Search"
              @keyup.enter="handleSearch"
            />
          </el-col>
        </el-row>
      </template>
      <template #operation="scope">
        <a
          class="table-operator-btn"
          v-auth="'platform_variable_edit'"
          @click="editRow(scope.row)"
          >编辑</a
        >
        <ProPopConfirm
          title="你确定要删除该变量嘛?"
          :icon="CircleCloseFilled"
          iconColor="red"
          @confirm="confirmDelete(scope.row)"
        >
          <a class="table-operator-btn" v-auth="'platform_variable_delete'"
            >删除</a
          >
        </ProPopConfirm>
      </template>
    </ProTable>
    <ProDrawer
      :title="detailDrawerTitle"
      ref="detailDrawerRef"
      @confirm="confirmDetail"
    >
      <VariableDetail ref="variableDetailRef" :initData="initDetailData" />
    </ProDrawer>
  </MainContentContainer>
</template>

<script setup lang="jsx">
import { ref, onMounted } from "vue";
import { ElTag } from "element-plus";
import { VARIABLE_TYPE } from "@/constant";
import { Search } from "@element-plus/icons-vue";
import ProTable from "@/components/ProTable.vue";
import ProDrawer from "@/components/ProDrawer.vue";
import VariableDetail from "./components/variableDetail.vue";
import ProPopConfirm from "@/components/ProPopConfirm.vue";
import { CircleCloseFilled } from "@element-plus/icons-vue";
import MainContentContainer from "@/components/MainContentContainer.vue";

const varName = ref("");
const loading = ref(false);
const datasource = ref([]);
const operateType = ref("");
const detailDrawerRef = ref();
const variableDetailRef = ref();
const detailDrawerTitle = ref("");
const initDetailData = ref(null);
const pageInfo = ref({
  total: 4,
  currentPage: 1,
  pageSize: 10,
  pageSizes: [10, 15, 20, 50],
});
const COLOR_MAP = {
  1: "",
  2: "success",
  3: "warning",
};

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
  const res = await variableDetailRef.value.validate();
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
  console.log(varName.value);
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
    prop: "classOneName",
    label: "一级变量",
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.classOneName}>
          <span className="table-first-col">{scope.row.classOneName}</span>
        </div>
      );
    },
  },
  {
    prop: "varType",
    label: "变量类型",
    render: (scope) => {
      const item = VARIABLE_TYPE.find((v) => v.value === scope.row.varType);
      return item ? (
        <ElTag type={COLOR_MAP[item.value]}>
          <span>{item.label}</span>
        </ElTag>
      ) : (
        ""
      );
    },
  },
  {
    prop: "classTwoName",
    label: "二级变量",
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
          classOneName: "空调系统设备",
          classTwoName: "主机用电量",
          varType: "2",
        },
        {
          id: "2",
          classOneName: "动力设备",
          classTwoName: "电梯用电量",
          varType: "2",
        },
        {
          id: "3",
          classOneName: "用水设备",
          classTwoName: "食堂用水量",
          varType: "1",
        },
        {
          id: "4",
          classOneName: "燃气",
          classTwoName: "厨具",
          varType: "3",
        },
      ]);
    }, 1000);
  });
  datasource.value = res;
});
</script>
