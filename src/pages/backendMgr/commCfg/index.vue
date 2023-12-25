<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-25 19:16:31
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
              v-model="gateway"
              placeholder="网关名称"
              :suffix-icon="Search"
              @keyup.enter="handleSearch"
            />
          </el-col>
        </el-row>
      </template>
      <template #operation="scope">
        <a class="table-operator-btn" @click="editRow(scope.row)">编辑</a>
        <ProPopConfirm
          title="你确定要删除该配置嘛?"
          :icon="CircleCloseFilled"
          iconColor="red"
          @confirm="confirmDelete(scope.row)"
        >
          <a class="table-operator-btn">删除</a>
        </ProPopConfirm>
      </template>
    </ProTable>
    <ProDrawer
      :title="detailDrawerTitle"
      ref="detailDrawerRef"
      @confirm="confirmDetail"
    >
      <Detail ref="commDetailRef" :initData="initDetailData" />
    </ProDrawer>
  </MainContentContainer>
</template>

<script setup lang="jsx">
import { ref, onMounted } from "vue";
import { Search } from "@element-plus/icons-vue";
import ProTable from "@/components/ProTable.vue";
import ProDrawer from "@/components/ProDrawer.vue";
import Detail from "./detail.vue";
import ProPopConfirm from "@/components/ProPopConfirm.vue";
import { CircleCloseFilled } from "@element-plus/icons-vue";
import MainContentContainer from "@/components/MainContentContainer.vue";

const gateway = ref("");
const loading = ref(false);
const datasource = ref([]);
const operateType = ref("");
const detailDrawerRef = ref();
const commDetailRef = ref();
const detailDrawerTitle = ref("");
const initDetailData = ref(null);
const pageInfo = ref({
  total: 4,
  currentPage: 1,
  pageSize: 10,
  pageSizes: [10, 15, 20, 50],
});

const addRow = () => {
  operateType.value = "add";
  detailDrawerTitle.value = "新增通信配置";
  initDetailData.value = null;
  detailDrawerRef.value.open();
};

const editRow = (data) => {
  operateType.value = "edit";
  detailDrawerTitle.value = "编辑通信配置";
  initDetailData.value = data;
  detailDrawerRef.value.open();
};

const confirmDetail = async () => {
  const res = await commDetailRef.value.validate();
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
  console.log(gateway.value);
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
    prop: "gatewayId",
    label: "网关ID",
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.gatewayId}>
          <b>{scope.row.gatewayId}</b>
        </div>
      );
    },
  },
  {
    prop: "gatewayName",
    label: "网关名称",
  },
  {
    prop: "gatewayVersion",
    label: "网关版本",
  },
  {
    prop: "interface",
    label: "通讯接口",
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
          gatewayId: "192.168.2.1",
          remark: "这是备注内容这是备注内容",
          interface: "RS232",
          gatewayName: "项目1网关",
          gatewayVersion: "1.0",
        },
        {
          id: "2",
          gatewayId: "192.168.2.1",
          remark: "这是备注内容",
          interface: "RS232",
          gatewayName: "项目1网关",
          gatewayVersion: "1.0",
        },
        {
          id: "3",
          gatewayId: "192.168.2.1",
          remark: "这是备注内容这是备注内容",
          interface: "RS232",
          gatewayName: "项目2网关",
          gatewayVersion: "2.0",
        },
        {
          id: "4",
          gatewayId: "192.168.2.1",
          remark: "这是备注内容",
          interface: "RS232",
          gatewayName: "项目2网关",
          gatewayVersion: "2.0",
        },
      ]);
    }, 1000);
  });
  datasource.value = res;
});
</script>
