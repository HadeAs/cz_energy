<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-27 11:34:01
 * @Description: 
-->
<template>
  <div>
    <ProSearchContainer
      class="search"
      buttonContent="搜索"
      :form-info="searchFormCfg"
      @button-click="onSearch"
      authKey="systemlog_alarm_search"
    />
    <MainContentContainer>
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
    label: "报警时间范围",
    prop: "timeRange",
    type: "datetimerange",
    value: "",
  },
  { label: "设备名称", prop: "device", type: "input", value: "" },
];

const onSearch = (data) => {
  console.log(data);
};

const pageChange = (currentPage, pageSize) => {
  console.log(currentPage, pageSize);
};

const column = [
  {
    prop: "alarmContent",
    label: "操作用户",
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.alarmContent}>
          <b>{scope.row.alarmContent}</b>
        </div>
      );
    },
  },
  {
    prop: "operTime",
    label: "操作时间",
  },
  {
    prop: "system",
    label: "所属系统",
  },
  {
    prop: "projectName",
    label: "所属项目",
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
          alarmContent: "压力传感器故障",
          operTime: "2018-03-03  15:20:40",
          projectName: "项目001",
          system: "空调系统",
        },
        {
          id: "2",
          alarmContent: "压力传感器故障",
          operTime: "2018-03-03  15:20:40",
          projectName: "项目001",
          system: "空调系统",
        },
        {
          id: "3",
          alarmContent: "压力传感器故障",
          operTime: "2018-03-03  15:20:40",
          projectName: "项目001",
          system: "动力系统",
        },
        {
          id: "4",
          alarmContent: "压力传感器故障",
          operTime: "2018-03-03  15:20:40",
          projectName: "项目001",
          system: "动力系统",
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
