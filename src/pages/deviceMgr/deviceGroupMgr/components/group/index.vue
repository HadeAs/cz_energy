<!--
 * @Author: ymZhang
 * @Date: 2023-12-26 17:28:58
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-27 14:03:49
 * @Description: 
-->
<template>
  <div>
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
              <el-button
                type="primary"
                @click="addRow"
                v-auth="'group_index_add'"
                >新增</el-button
              >
              <el-button
                :disabled="!state.selectRows.length"
                @click="batchDelete"
                v-auth="'group_index_batch_delete'"
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
                  <el-select v-model="state.searchFormData.status">
                    <el-option
                      v-for="item in state.statusOpts"
                      :key="item.id"
                      :label="item.text"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="state.searchFormData.type">
                    <el-option
                      v-for="item in state.typeOpts"
                      :key="item.id"
                      :label="item.text"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
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
            v-auth="'group_index_edit'"
            >编辑</a
          >
          <ProPopConfirm
            title="你确定要删除该项目嘛?"
            :icon="CircleCloseFilled"
            iconColor="red"
            @confirm="deleteRow(scope.row)"
          >
            <a class="table-operator-btn" v-auth="'group_index_delete'">删除</a>
          </ProPopConfirm>
          <a
            class="table-operator-btn"
            v-auth="'group_index_connect'"
            @click="relateRow(scope.row)"
            >关联设备参数</a
          >
        </template>
      </ProTable>
    </MainContentContainer>
    <Detail
      ref="detailRef"
      :title="state.title"
      :data="state.currentData"
      @submit="detailSubmit"
    />
    <Relate ref="relateRef" :data="state.paramData" @submit="relateSubmit" />
  </div>
</template>
<script lang="jsx" setup name="Group">
import { reactive, ref } from "vue";
import Detail from "./detail.vue";
import Relate from "./relate.vue";
import { Search, CircleCloseFilled } from "@element-plus/icons-vue";

const COMMON_DATA_MAPS = [
  {
    checkBox: "",
    id: "",
    name: "设备001",
    no: "ZC785646325",
    project: "项目001",
    type: "冷水机组",
    classify: "空调系统",
    dept: "设备科",
    admin: "admin",
    status: 1,
    time: "2023-05-12",
    position: "空调主机—一楼主机机房",
  },
  {
    checkBox: "",
    id: "",
    name: "设备001",
    no: "ZC785646325",
    project: "项目001",
    type: "冷水机组",
    classify: "空调系统",
    dept: "设备科",
    admin: "admin",
    status: 0,
    time: "2023-05-12",
    position: "空调主机—一楼主机机房",
  },
  {
    checkBox: "",
    id: "",
    name: "设备001",
    no: "ZC785646325",
    project: "项目001",
    type: "冷水机组",
    classify: "空调系统",
    dept: "设备科",
    admin: "admin",
    status: 1,
    time: "2023-05-12",
    position: "空调主机—一楼主机机房",
  },
  {
    checkBox: "",
    id: "",
    name: "设备001",
    no: "ZC785646325",
    project: "项目001",
    type: "冷水机组",
    classify: "空调系统",
    dept: "设备科",
    admin: "admin",
    status: 0,
    time: "2023-05-12",
    position: "空调主机—一楼主机机房",
  },
];

const detailRef = ref();
const relateRef = ref();
const state = reactive({
  searchFormData: {
    status: "all",
    type: "all",
    nameType: "all",
    name: "",
  },
  statusOpts: [
    {
      id: "all",
      text: "启用状态",
    },
    {
      id: "1",
      text: "启用",
    },
    {
      id: "2",
      text: "停用",
    },
  ],
  typeOpts: [
    {
      id: "all",
      text: "系统分类",
    },
    {
      id: "1",
      text: "空调系统",
    },
    {
      id: "2",
      text: "动力系统",
    },
  ],
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
  paramData: {},
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
    label: "设备名称",
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
    prop: "no",
    label: "资产编号",
    width: 120,
  },
  {
    prop: "project",
    label: "项目名称",
    width: 180,
  },
  {
    prop: "type",
    label: "设备类型",
    width: 100,
  },
  {
    prop: "classify",
    label: "所属系统分类",
    width: 120,
  },
  {
    prop: "dept",
    label: "管理科室",
  },
  {
    prop: "admin",
    label: "管理人",
  },
  {
    prop: "position",
    label: "设备位置",
    width: 180,
  },
  {
    prop: "time",
    label: "启用时间",
    width: 150,
  },
  {
    prop: "status",
    label: "设备状态",
    render: (scope) => {
      const status = scope.row.status;
      return (
        <div className="badge">
          <span className={status === 1 ? "success" : "danger"}>●</span>
          {status === 1 ? "启用" : "停用"}
        </div>
      );
    },
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
const relateRow = (row) => {
  state.paramData = row;
  relateRef.value.open();
};
const deleteRow = (row) => {};
const detailSubmit = (data) => {};
const relateSubmit = (data) => {};
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
