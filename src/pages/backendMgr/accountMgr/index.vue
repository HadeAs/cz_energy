<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-26 21:04:21
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
            <el-button type="primary" v-auth="'account_add'" @click="addRow"
              >新增</el-button
            >
          </el-col>
          <el-col :offset="14" :span="4">
            <el-select
              clearable
              v-model="projName"
              placeholder="选择项目"
              @change="handleSearch"
            >
              <el-option
                v-for="item in projects"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-input
              clearable
              v-model="user"
              placeholder="用户名/用户角色"
              :suffix-icon="Search"
              @keyup.enter="handleSearch"
            />
          </el-col>
        </el-row>
      </template>
      <template #operation="scope">
        <a
          v-auth="'account_edit'"
          class="table-operator-btn"
          @click="editRow(scope.row)"
          >编辑</a
        >
        <ProPopConfirm
          title="你确定要删除该账号嘛?"
          :icon="CircleCloseFilled"
          iconColor="red"
          @confirm="confirmDelete(scope.row)"
        >
          <a v-auth="'account_delete'" class="table-operator-btn">删除</a>
        </ProPopConfirm>
      </template>
    </ProTable>
    <ProDrawer
      :title="detailDrawerTitle"
      ref="detailDrawerRef"
      @confirm="confirmDetail"
    >
      <Detail ref="accountDetailRef" :initData="initDetailData" />
    </ProDrawer>
  </MainContentContainer>
</template>

<script setup lang="jsx">
import { ref, onMounted } from "vue";
import { Search } from "@element-plus/icons-vue";
import ProTable from "@/components/ProTable.vue";
import ProDrawer from "@/components/ProDrawer.vue";
import Detail from "./detail.vue";
import { COMMON_ROLE, LOCK_STATUS } from "@/constant";
import ProPopConfirm from "@/components/ProPopConfirm.vue";
import { CircleCloseFilled } from "@element-plus/icons-vue";
import MainContentContainer from "@/components/MainContentContainer.vue";

const user = ref("");
const projName = ref("");
const loading = ref(false);
const datasource = ref([]);
const operateType = ref("");
const detailDrawerRef = ref();
const accountDetailRef = ref();
const detailDrawerTitle = ref("");
const initDetailData = ref(null);
const pageInfo = ref({
  total: 4,
  currentPage: 1,
  pageSize: 10,
  pageSizes: [10, 15, 20, 50],
});

const projects = [
  { label: "项目001", value: "项目001" },
  { label: "项目002", value: "项目002" },
  { label: "项目003", value: "项目003" },
  { label: "项目004", value: "项目004" },
  { label: "项目005", value: "项目005" },
  { label: "项目006", value: "项目006" },
  { label: "项目007", value: "项目007" },
  { label: "项目008", value: "项目008" },
];

const addRow = () => {
  operateType.value = "add";
  detailDrawerTitle.value = "新增账号信息";
  initDetailData.value = null;
  detailDrawerRef.value.open();
};

const editRow = (data) => {
  operateType.value = "edit";
  detailDrawerTitle.value = "编辑账号信息";
  initDetailData.value = data;
  detailDrawerRef.value.open();
};

const confirmDetail = async () => {
  const res = await accountDetailRef.value.validate();
  if (res) {
    // 账号新增/编辑逻辑
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
  console.log("项目名：", projName.value, "用户：", user.value);
};

const confirmDelete = (data) => {
  // 账号删除逻辑
  const idx = datasource.value.findIndex((v) => v.id === data.id);
  datasource.value.splice(idx, 1);
  datasource.value = [...datasource.value];
};

const pageChange = (currentPage, pageSize) => {
  console.log(currentPage, pageSize);
};

const column = [
  {
    prop: "userName",
    label: "用户名",
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.userName}>
          <b>{scope.row.userName}</b>
        </div>
      );
    },
  },
  {
    prop: "userRole",
    label: "用户角色",
    render: (scope) => {
      const item = COMMON_ROLE.find((v) => v.value === scope.row.userRole);
      return item ? (
        <div className="text-overflow" title={item.label}>
          <span>{item.label}</span>
        </div>
      ) : (
        ""
      );
    },
  },
  {
    prop: "bindProject",
    label: "绑定项目",
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.bindProject}>
          <span>{scope.row.bindProject}</span>
        </div>
      );
    },
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
  {
    prop: "status",
    label: "账号状态",
    render: (scope) => {
      const ifNormal = scope.row.status === "1";
      const item = LOCK_STATUS.find((v) => v.value === scope.row.status);
      return item ? (
        <>
          <span
            style={{
              color: ifNormal ? "#00B050" : "#FA5555",
              fontSize: "8px",
              marginRight: "5px",
            }}
          >
            ●{" "}
          </span>
          <span>{item.label}</span>
        </>
      ) : (
        ""
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
          userName: "admin",
          remark: "这是备注内容这是备注内容",
          status: "1",
          userRole: "1",
          bindProject: ["项目001"],
        },
        {
          id: "2",
          userName: "admin",
          remark: "这是备注内容",
          status: "1",
          userRole: "1",
          bindProject: ["项目001"],
        },
        {
          id: "3",
          userName: "admin",
          remark: "这是备注内容这是备注内容",
          status: "1",
          userRole: "2",
          bindProject: ["项目002"],
        },
        {
          id: "4",
          userName: "admin",
          remark: "这是备注内容",
          status: "0",
          userRole: "2",
          bindProject: ["项目002"],
        },
      ]);
    }, 1000);
  });
  datasource.value = res;
});
</script>
