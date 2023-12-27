<!--
 * @Author: ymZhang
 * @Date: 2023-12-26 17:28:58
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-27 14:06:59
 * @Description: 
-->
<template>
  <div class="cs-detail-container">
    <div class="cs-header">设备运行回收站</div>
    <div class="cs-main-wrap">
      <MainContentContainer class="main-container">
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
              <el-col :span="24">
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
            <ProPopConfirm
              title="你确定要恢复该设备吗?"
              :icon="CircleCloseFilled"
              iconColor="red"
              @confirm="recoverRow(scope.row)"
            >
              <a
                class="table-operator-btn"
                v-auth="'group_work_recycle_restore'"
                >恢复</a
              >
            </ProPopConfirm>
          </template>
        </ProTable>
      </MainContentContainer>
    </div>
  </div>
</template>
<script lang="jsx" setup name="RecycleBin">
import { reactive, ref } from "vue";
import { Search, CircleCloseFilled } from "@element-plus/icons-vue";
import { ElPopover } from "element-plus";

const COMMON_DATA_MAPS = [
  {
    checkBox: "",
    id: "",
    name: "设备001",
    project: "项目001",
    type: "空调（主机机房、末端侧）",
    status: 1,
    time: "2023-05-12  15:21",
    num: 5,
  },
  {
    checkBox: "",
    id: "",
    name: "设备001",
    project: "项目001",
    type: "供配电（高低压系统、配电系统）",
    status: 0,
    time: "2023-05-12  15:21",
    num: 5,
  },
  {
    checkBox: "",
    id: "",
    name: "设备001",
    project: "项目001",
    type: "照明",
    status: 1,
    time: "2023-05-12  15:21",
    num: 5,
  },
  {
    checkBox: "",
    id: "",
    name: "设备001",
    project: "项目001",
    type: "动力电梯设备、生活水泵）",
    status: 0,
    time: "2023-05-12  15:21",
    num: 5,
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
    prop: "project",
    label: "所属项目",
    width: 130,
  },
  {
    prop: "type",
    label: "所属系统",
    width: 180,
    render: (scope) => {
      const data = scope.row.type;
      let type;
      if (data) {
        if (data.indexOf("空调") > -1) {
          type = "";
        } else if (data.indexOf("供配电") > -1) {
          type = "success";
        } else if (data.indexOf("照明") > -1) {
          type = "warning";
        } else if (data.indexOf("动力") > -1) {
          type = "danger";
        } else {
          type = "info";
        }
      }
      return <ElTag type={type}>{data}</ElTag>;
    },
  },
  {
    prop: "time",
    label: "启用时间",
    width: 180,
  },
  {
    prop: "status",
    label: "设备状态",
    width: 100,
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
  {
    prop: "num",
    label: "关联设备参数",
    render: (scope) => {
      return (
        <ElPopover
          placement="right"
          title="关联设备参数:"
          width={200}
          trigger="click"
          v-slots={{
            default: () => (
              <>
                <div>冷热源侧回水温度</div>
                <div>用户侧供水温度</div>
                <div>用户侧回水温度</div>
                <div>汇丰大厦二次供水温度</div>
              </>
            ),
            reference: () => (
              <ElButton text type="primary">
                {scope.row.num}
              </ElButton>
            ),
          }}
        ></ElPopover>
      );
    },
  },
  {
    prop: "time",
    label: "参数信息",
    width: 150,
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

const pageChange = (currentPage, pageSize) => {
  console.log(currentPage, pageSize);
};
const selectionChange = (data) => {
  state.selectRows = data;
};
const recoverRow = (row) => {};
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
<style lang="scss" scoped>
.main-container {
  padding: 12px 14px !important;
}
</style>
