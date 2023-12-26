<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-26 21:06:02
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
      @selection-change="selectionChange"
    >
      <template #toolbar>
        <el-row align="middle" :gutter="5">
          <el-col :span="2">
            <el-button type="primary" v-auth="'auth_add'" @click="addRow"
              >新增</el-button
            >
          </el-col>
          <el-col :span="2">
            <el-button
              :disabled="!selectRows.length"
              v-auth="'auth_batch_delete'"
              @click="batchDelete"
              >批量删除</el-button
            >
          </el-col>
          <el-col :offset="16" :span="4">
            <el-input
              clearable
              v-model="roleName"
              placeholder="角色名称"
              :suffix-icon="Search"
              @keyup.enter="handleSearch"
            />
          </el-col>
        </el-row>
      </template>
      <template #operation="scope">
        <a
          class="table-operator-btn"
          v-auth="'auth_edit'"
          @click="editRow(scope.row)"
          >编辑</a
        >
        <ProPopConfirm
          title="你确定要删除该角色嘛?"
          :icon="CircleCloseFilled"
          iconColor="red"
          @confirm="confirmDelete(scope.row)"
        >
          <a class="table-operator-btn" v-auth="'auth_delete'">删除</a>
        </ProPopConfirm>
        <a
          class="table-operator-btn"
          v-auth="'auth_distribute'"
          @click="distribute"
          >分配</a
        >
      </template>
    </ProTable>
    <ProDrawer
      :title="detailDrawerTitle"
      ref="detailDrawerRef"
      @confirm="confirmDetail"
    >
      <RoleDetail ref="roleDetailRef" :initData="initDetailData" />
    </ProDrawer>
    <ProDrawer
      title="分配权限"
      ref="distributeDrawerRef"
      @confirm="confirmDistribute"
    >
      <RoleDistribute ref="roleDistributeRef" :initData="initDistributeData" />
    </ProDrawer>
  </MainContentContainer>
</template>

<script setup lang="jsx">
import { ref, onMounted } from "vue";
import { Search } from "@element-plus/icons-vue";
import ProTable from "@/components/ProTable.vue";
import ProDrawer from "@/components/ProDrawer.vue";
import RoleDetail from "./detail.vue";
import RoleDistribute from "./distribute.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import ProPopConfirm from "@/components/ProPopConfirm.vue";
import { CircleCloseFilled } from "@element-plus/icons-vue";
import MainContentContainer from "@/components/MainContentContainer.vue";

const roleName = ref("");
const loading = ref(false);
const datasource = ref([]);
const selectRows = ref([]);
const operateType = ref("");
const detailDrawerRef = ref();
const distributeDrawerRef = ref();
const roleDetailRef = ref();
const roleDistributeRef = ref();
const detailDrawerTitle = ref("");
const initDetailData = ref(null);
const initDistributeData = ref([]);
const pageInfo = ref({
  total: 4,
  currentPage: 1,
  pageSize: 10,
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

const distribute = () => {
  //模拟当前角色的权限点
  const mock_auth = [
    "project",
    "systemlog",
    "carbon",
    "project_add",
    "systemlog_login_search",
  ];
  initDistributeData.value = mock_auth;
  distributeDrawerRef.value.open();
};

const confirmDistribute = () => {
  const res = roleDistributeRef.value.getCheckResult();
  console.log(res);
  distributeDrawerRef.value.close();
};

const confirmDetail = async () => {
  const res = await roleDetailRef.value.validate();
  if (res) {
    // 新增/编辑逻辑
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
  console.log(roleName.value);
};

const confirmDelete = (data) => {
  // 删除逻辑
  const idx = datasource.value.findIndex((v) => v.id === data.id);
  datasource.value.splice(idx, 1);
  datasource.value = [...datasource.value];
};

const pageChange = (currentPage, pageSize) => {
  console.log(currentPage, pageSize);
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
      // 批量删除逻辑
      datasource.value = datasource.value.filter((v) => {
        return !selectRows.value.find((item) => item.id === v.id);
      });
      ElMessage({
        type: "success",
        message: "删除成功",
      });
    })
    .catch(() => {});
};

const column = [
  {
    prop: "roleName",
    label: "角色名称",
    width: 120,
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.roleName}>
          <b>{scope.row.roleName}</b>
        </div>
      );
    },
  },
  {
    prop: "roleKey",
    label: "角色key",
  },
  {
    prop: "createTime",
    label: "创建时间",
    width: 200,
  },
  {
    prop: "updateTime",
    label: "更新时间",
    width: 200,
  },
  {
    prop: "remark",
    label: "备注",
    width: 200,
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
          roleName: "超级管理员",
          remark: "--",
          createTime: "2018-03-03  15:20:40",
          updateTime: "2018-03-05  15:20:40",
          roleKey: "1",
        },
        {
          id: "2",
          roleName: "企业管理员",
          remark: "--",
          createTime: "2018-03-03  15:20:40",
          updateTime: "2018-03-05  15:20:40",
          roleKey: "2",
        },
        {
          id: "3",
          roleName: "一般用户",
          remark: "--",
          createTime: "2018-03-03  15:20:40",
          updateTime: "2018-03-05  15:20:40",
          roleKey: "3",
        },
        {
          id: "4",
          roleName: "远程监管用户",
          remark: "--",
          createTime: "2018-03-03  15:20:40",
          updateTime: "2018-03-05  15:20:40",
          roleKey: "4",
        },
      ]);
    }, 1000);
  });
  datasource.value = res;
});
</script>
