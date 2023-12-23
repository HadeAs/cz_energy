<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-23 17:30:36
 * @Description: 
-->
<template>
  <MainContentContainer>
    <ProTable
      :multiple="true"
      :column="column"
      :pageInfo="pageInfo"
      :datasource="datasource"
      v-loading="loading"
      @page-change="pageChange"
      @page-prev-click="pagePrevClick"
      @page-next-click="pageNextClick"
      @selection-change="selectionChange"
    >
      <template #toolbar>
        <el-row align="middle" :gutter="5">
          <el-col :span="2">
            <el-button type="primary">新增</el-button>
          </el-col>
          <el-col :span="2">
            <el-button :disabled="!selectRows.length" @click="batchDelete"
              >批量删除</el-button
            >
          </el-col>
          <el-col :offset="16" :span="4">
            <el-input
              clearable
              v-model="projName"
              placeholder="项目名称"
              :suffix-icon="Search"
              @keyup.enter="handleSearch"
            />
          </el-col>
        </el-row>
      </template>
      <template #operation="scope">
        <a class="table-operator-btn" @click="editRow(scope)">编辑</a>
        <ProPopConfirm
          title="你确定要删除该项目嘛?"
          :icon="CircleCloseFilled"
          iconColor="red"
          @confirm="confirmDelete"
        >
          <a class="table-operator-btn">删除</a>
        </ProPopConfirm>
        <a class="table-operator-btn">项目图片</a>
        <a class="table-operator-btn">费用配置</a>
      </template>
    </ProTable>
  </MainContentContainer>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Search } from "@element-plus/icons-vue";
import ProTable from "@/components/ProTable.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import ProPopConfirm from "@/components/ProPopConfirm.vue";
import { CircleCloseFilled } from "@element-plus/icons-vue";
import MainContentContainer from "@/components/MainContentContainer.vue";

const projName = ref("");
const loading = ref(false);
const datasource = ref([]);
const selectRows = ref([]);

const editRow = (scope) => {
  console.log(scope.row);
};

const handleSearch = () => {
  console.log(projName.value);
};

const confirmDelete = () => {
  console.log("confirm delete");
};

const pageChange = (currentPage, pageSize) => {
  console.log(currentPage, pageSize);
};

const pagePrevClick = (val) => {
  console.log(val);
};

const pageNextClick = (val) => {
  console.log(val);
};

const selectionChange = (data) => {
  selectRows.value = data;
};

const batchDelete = () => {
  ElMessageBox.confirm("确认删除选中的内容？", "警告", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "Delete completed",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
};

const pageInfo = {
  total: 100,
  currentPage: 3,
  pageSize: 10,
  pageSizes: [10, 15, 20, 50],
};

const column = [
  {
    prop: "projectName",
    label: "项目名称",
  },
  {
    prop: "district",
    label: "所在地区",
  },
  {
    prop: "area",
    label: "建筑面积(万平方米)",
  },
  {
    prop: "mode",
    label: "当前模式",
  },
  {
    prop: "startTime",
    label: "项目起始时间",
  },
];

onMounted(async () => {
  loading.value = true;
  const res = await new Promise((resolve) => {
    setTimeout(() => {
      loading.value = false;
      resolve([
        {
          projectName: "项目001",
          mode: "供暖",
          startTime: "2016-05-03",
          district: "南京",
          area: "4",
        },
        {
          projectName: "项目002",
          mode: "供冷",
          startTime: "2016-05-02",
          district: "南京",
          area: "4",
        },
        {
          projectName: "项目003",
          mode: "供暖",
          startTime: "2016-05-04",
          district: "南京",
          area: "4",
        },
        {
          projectName: "项目004",
          mode: "供冷",
          startTime: "2016-05-01",
          district: "南京",
          area: "4",
        },
      ]);
    }, 2000);
  });
  datasource.value = res;
});
</script>
<style lang="scss" scoped>
.table-operator-btn {
  margin-right: 10px;
  cursor: pointer;
  color: #ff3300;
}
</style>
