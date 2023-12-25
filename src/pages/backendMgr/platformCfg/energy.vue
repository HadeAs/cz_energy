<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-25 20:55:19
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
            <el-button type="primary" @click="addRow">新增</el-button>
          </el-col>
          <el-col :offset="18" :span="4">
            <el-input
              clearable
              v-model="sysClass"
              placeholder="系统分类名称"
              :suffix-icon="Search"
              @keyup.enter="handleSearch"
            />
          </el-col>
        </el-row>
      </template>
      <template #operation="scope">
        <ProPopConfirm
          title="你确定要删除该内容嘛?"
          :icon="CircleCloseFilled"
          iconColor="red"
          @confirm="confirmDelete(scope.row)"
        >
          <a class="table-operator-btn">删除</a>
        </ProPopConfirm>
      </template>
    </ProTable>
    <ProDrawer title="新增" ref="detailDrawerRef" @confirm="confirmDetail">
      <EnergyDetail ref="energyDetailRef" :initData="initDetailData" />
    </ProDrawer>
  </MainContentContainer>
</template>

<script setup lang="jsx">
import { ref, onMounted } from "vue";
import { Search } from "@element-plus/icons-vue";
import ProTable from "@/components/ProTable.vue";
import ProDrawer from "@/components/ProDrawer.vue";
import EnergyDetail from "./components/energyDetail.vue";
import ProPopConfirm from "@/components/ProPopConfirm.vue";
import { CircleCloseFilled } from "@element-plus/icons-vue";
import MainContentContainer from "@/components/MainContentContainer.vue";

const sysClass = ref("");
const loading = ref(false);
const datasource = ref([]);
const detailDrawerRef = ref();
const energyDetailRef = ref();
const initDetailData = ref(null);
const pageInfo = ref({
  total: 6,
  currentPage: 1,
  pageSize: 10,
  pageSizes: [10, 15, 20, 50],
});

const addRow = () => {
  initDetailData.value = null;
  detailDrawerRef.value.open();
};

const confirmDetail = async () => {
  const res = await energyDetailRef.value.validate();
  if (res) {
    // 配置新增逻辑
    datasource.value.push(res);
    datasource.value = [...datasource.value];
    detailDrawerRef.value.close();
  }
};

const handleSearch = () => {
  console.log(sysClass.value);
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
    prop: "sysClassName",
    label: "系统分类名称",
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.sysClassName}>
          <b>{scope.row.sysClassName}</b>
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
          sysClassName: "照明插座系统",
        },
        {
          id: "2",
          sysClassName: "空调系统",
        },
        {
          id: "3",
          sysClassName: "动力系统",
        },
        {
          id: "4",
          sysClassName: "特殊系统",
        },
        {
          id: "5",
          sysClassName: "市政系统",
        },
        {
          id: "6",
          sysClassName: "其他",
        },
      ]);
    }, 1000);
  });
  datasource.value = res;
});
</script>
