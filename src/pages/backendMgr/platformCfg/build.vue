<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2024-01-05 18:48:36
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
              v-auth="'platform_build_add'"
              @click="addRow"
              >新增</el-button
            >
          </el-col>
          <el-col :offset="18" :span="4">
            <el-input
              clearable
              v-model="typeName"
              placeholder="建筑类型名称"
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
          <a class="table-operator-btn" v-auth="'platform_build_delete'"
            >删除</a
          >
        </ProPopConfirm>
      </template>
    </ProTable>
    <ProDrawer title="新增" ref="detailDrawerRef" @confirm="confirmDetail">
      <BuildDetail ref="buildDetailRef" :initData="initDetailData" />
    </ProDrawer>
  </MainContentContainer>
</template>

<script setup lang="jsx">
import { ref, onMounted } from "vue";
import { Search } from "@element-plus/icons-vue";
import ProTable from "@/components/ProTable.vue";
import ProDrawer from "@/components/ProDrawer.vue";
import BuildDetail from "./components/buildDetail.vue";
import ProPopConfirm from "@/components/ProPopConfirm.vue";
import { CircleCloseFilled } from "@element-plus/icons-vue";
import MainContentContainer from "@/components/MainContentContainer.vue";

const typeName = ref("");
const loading = ref(false);
const datasource = ref([]);
const detailDrawerRef = ref();
const buildDetailRef = ref();
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
  const res = await buildDetailRef.value.validate();
  if (res) {
    // 配置新增逻辑
    datasource.value.push(res);
    datasource.value = [...datasource.value];
    detailDrawerRef.value.close();
  }
};

const handleSearch = () => {
  console.log(typeName.value);
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
    prop: "buildTypeName",
    label: "建筑类型名称",
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.buildTypeName}>
          <span className="table-first-col">{scope.row.buildTypeName}</span>
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
          buildTypeName: "办公建筑",
        },
        {
          id: "2",
          buildTypeName: "商场建筑",
        },
        {
          id: "3",
          buildTypeName: "宾馆饭店建筑",
        },
        {
          id: "4",
          buildTypeName: "文化教育建筑",
        },
        {
          id: "5",
          buildTypeName: "医疗卫生建筑",
        },
        {
          id: "6",
          buildTypeName: "体育建筑",
        },
      ]);
    }, 1000);
  });
  datasource.value = res;
});
</script>
