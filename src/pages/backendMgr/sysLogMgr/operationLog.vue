<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-26 21:15:46
 * @Description: 
-->
<template>
  <div>
    <ProSearchContainer
      class="search"
      buttonContent="搜索"
      :form-info="searchFormCfg"
      @button-click="onSearch"
      authKey="systemlog_operation_search"
    />
    <MainContentContainer style="height: calc(100vh - 198px)">
      <ProTable
        :column="column"
        :pageInfo="pageInfo"
        :datasource="datasource"
        v-loading="loading"
        @page-change="pageChange"
      />
    </MainContentContainer>
  </div>
</template>

<script setup lang="jsx">
import { ref, onMounted } from "vue";
import ProTable from "@/components/ProTable.vue";
import ProSearchContainer from "@/components/ProSearchContainer.vue";
import MainContentContainer from "@/components/MainContentContainer.vue";

const loading = ref(false);
const datasource = ref([]);
const pageInfo = ref({
  total: 4,
  currentPage: 1,
  pageSize: 10,
  pageSizes: [10, 15, 20, 50],
});

const searchFormCfg = [
  {
    label: "操作时间范围",
    prop: "timeRange",
    type: "datetimerange",
    value: "",
  },
  { label: "操作用户", prop: "userName", type: "input", value: "" },
];

const onSearch = (data) => {
  console.log(data);
};

const pageChange = (currentPage, pageSize) => {
  console.log(currentPage, pageSize);
};

const column = [
  {
    prop: "userName",
    label: "操作用户",
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.userName}>
          <b>{scope.row.userName}</b>
        </div>
      );
    },
  },
  {
    prop: "role",
    label: "用户角色",
  },
  {
    prop: "operTime",
    label: "操作时间",
  },
  {
    prop: "operContent",
    label: "操作内容",
    width: 500,
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.operContent}>
          <span>{scope.row.operContent}</span>
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
          userName: "admin1",
          operTime: "2018-03-03  15:20:40",
          operContent: "添加某某项目信息",
          role: "企业管理员",
        },
        {
          id: "2",
          userName: "admin2",
          operTime: "2018-03-03  15:20:40",
          operContent: "添加某某项目信息添加某某项目信息添加某某项目信息",
          role: "企业管理员",
        },
        {
          id: "3",
          userName: "admin3",
          operTime: "2018-03-03  15:20:40",
          operContent: "更新某某账号信息更新某某账号信息",
          role: "超级管理员",
        },
        {
          id: "4",
          userName: "admin4",
          operTime: "2018-03-03  15:20:40",
          operContent: "添加某某项目信息",
          role: "超级管理员",
        },
      ]);
    }, 1000);
  });
  datasource.value = res;
});
</script>
<style lang="scss" scoped>
.search {
  margin-bottom: 10px;
}
</style>
