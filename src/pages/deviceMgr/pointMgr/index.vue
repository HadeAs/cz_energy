<!--
 * @Author: ymZhang
 * @Date: 2023-12-26 17:28:58
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-28 12:55:30
 * @Description: 
-->
<template>
  <MainContentContainer>
    <ProTable
      multiple
      :column="column"
      :pageInfo="pageInfo"
      :datasource="state.dataSource"
      v-loading="state.loading"
      @page-change="pageChange"
      @selection-change="selectionChange"
    >
      <template #toolbar>
        <el-row align="middle" :gutter="5">
          <el-col :span="6">
            <el-button type="primary" @click="addRow" v-auth="'point_add'"
              >新增</el-button
            >
            <el-button
              :disabled="!state.selectRows.length"
              @click="batchDelete"
              v-auth="'point_batch_delete'"
              >批量删除</el-button
            >
          </el-col>
          <el-col :span="18">
            <el-form
              class="search-form"
              :inline="true"
              :model="state.searchFormData"
            >
              <el-form-item>
                <el-select v-model="state.searchFormData.nameType">
                  <el-option
                    v-for="item in state.nameOpts"
                    :key="item.id"
                    :label="item.text"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-input
                  v-model="state.searchFormData.name"
                  placeholder="项目名称"
                  :suffix-icon="Search"
                />
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </template>
      <template #operation="scope">
        <a
          class="table-operator-btn"
          @click="editRow(scope.row)"
          v-auth="'point_edit'"
          >编辑</a
        >
        <ProPopConfirm
          title="你确定要删除该设备吗?"
          :icon="CircleCloseFilled"
          iconColor="red"
          @confirm="deleteRow(scope.row)"
        >
          <a class="table-operator-btn" v-auth="'point_delete'">删除</a>
        </ProPopConfirm>
      </template>
    </ProTable>
    <Detail
      ref="detailRef"
      :title="state.title"
      :data="state.currentData"
      @submit="detailSubmit"
    />
  </MainContentContainer>
</template>
<script lang="jsx" setup name="PointMgr">
import { reactive, ref } from "vue";
import Detail from "./components/detail.vue";
import { Search, CircleCloseFilled } from "@element-plus/icons-vue";

const COMMON_DATA_MAPS = [
  {
    checkBox: "",
    project: "项目001",
    name: "压力传感器",
    label: "开关量",
    type: "--",
    gateway: "网关1",
    temp: "--",
    temp2: "--",
    state: "1",
    time: "6分钟",
    status: 0,
  },
  {
    checkBox: "",
    project: "项目001",
    name: "压力传感器",
    label: "开关量",
    type: "--",
    gateway: "网关1",
    temp: "--",
    temp2: "--",
    state: "1",
    time: "6分钟",
    status: 1,
  },
  {
    checkBox: "",
    project: "项目001",
    name: "压力传感器",
    label: "开关量",
    type: "--",
    gateway: "网关1",
    temp: "20",
    temp2: "5",
    state: "1",
    time: "6分钟",
    status: 0,
  },
  {
    checkBox: "",
    project: "项目001",
    name: "压力传感器",
    label: "开关量",
    type: "--",
    gateway: "网关1",
    temp: "20",
    temp2: "10",
    state: "1",
    time: "6分钟",
    status: 1,
  },
];

const detailRef = ref();
const state = reactive({
  searchFormData: {
    nameType: "all",
    name: "",
  },
  nameOpts: [
    {
      id: "all",
      text: "全部项目名称",
    },
    {
      id: "1",
      text: "项目名称1",
    },
    {
      id: "2",
      text: "项目名称2",
    },
  ],
  dataSource: [],
  loading: true,
  selectRows: [],
  currentData: {},
  title: "",
});
const pageInfo = reactive({
  total: 100,
  currentPage: 1,
  pageSize: 10,
  pageSizes: [10, 15, 20, 50],
});

const column = [
  {
    prop: "name",
    label: "点位名称",
    width: 110,
    fixed: true,
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.name}>
          <b>{scope.row.name}</b>
        </div>
      );
    },
  },
  {
    prop: "project",
    label: "所属项目",
    width: 180,
  },
  {
    prop: "gateway",
    label: "智能网关",
    width: 100,
  },
  {
    prop: "label",
    label: "单位",
    width: 100,
  },
  {
    prop: "state",
    label: "通讯号",
    width: 80,
  },
  {
    prop: "time",
    label: "采集频率",
  },
  {
    prop: "temp",
    label: "最大阈值",
  },
  {
    prop: "temp2",
    label: "最小阈值",
  },
];

const getList = async () => {
  const res = await new Promise((resolve) => {
    setTimeout(() => {
      state.loading = false;
      const data = new Array(10).fill("").map((num, index) => {
        const i = index % 4;
        return {
          ...COMMON_DATA_MAPS[i],
          project: COMMON_DATA_MAPS[i].project + "00" + index,
          id: index,
        };
      });
      resolve(data);
    }, 600);
  });
  state.dataSource = res;
};
getList();

const batchDelete = () => {
  ElMessageBox.confirm("确认删除选中的内容？", "警告", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "删除成功",
      });
    })
    .catch(() => {});
};
const pageChange = (currentPage, pageSize) => {
  console.log(currentPage, pageSize);
};
const selectionChange = (data) => {
  state.selectRows = data;
};

const addRow = () => {
  state.title = "新增";
  state.currentData = {};
  detailRef.value.open();
};
const editRow = (row) => {
  state.currentData = row;
  state.title = "编辑";
  detailRef.value.open();
};
const deleteRow = (row) => {};
const detailSubmit = (data) => {};
</script>
<style lang="scss" scoped>
.search-form {
  text-align: right;
  :deep() {
    .el-form-item {
      margin-right: 15px;
      margin-bottom: 0;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
<style lang="scss">
.badge {
  display: flex;
  align-items: center;
  span {
    margin-right: 6px;
  }
  .success {
    color: #00b000;
  }
  .danger {
    color: #ff3333;
  }
}
</style>
