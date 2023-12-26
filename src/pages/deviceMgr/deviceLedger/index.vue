<!--
 * @Author: ymZhang
 * @Date: 2023-12-21 18:17:35
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-26 14:53:15
 * @Description: 
-->
<template>
  <MainContentContainer>
    <ProTable
      :column="column"
      :pageInfo="pageInfo"
      :datasource="state.dataSource"
      v-loading="state.loading"
      @page-change="pageChange"
    >
      <template #toolbar>
        <el-row align="middle" :gutter="5">
          <el-col :span="6">
            <el-button type="primary" @click="addRow">新增</el-button>
            <el-button @click="imports">批量导入</el-button>
          </el-col>
          <el-col :span="18">
            <el-form
              class="search-form"
              :inline="true"
              :model="state.searchFormData"
            >
              <el-form-item>
                <el-select v-model="state.searchFormData.type">
                  <el-option
                    v-for="item in state.names"
                    :key="item.id"
                    :label="item.text"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-select v-model="state.searchFormData.deviceType">
                  <el-option
                    v-for="item in state.types"
                    :key="item.id"
                    :label="item.text"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-input
                  v-model="state.searchFormData.number"
                  placeholder="设备名称/资产编号"
                  :suffix-icon="Search"
                />
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </template>
      <template #operation="scope">
        <a class="table-operator-btn" @click="editRow(scope.row)">编辑</a>
        <ProPopConfirm
          title="你确定要删除该配置吗?"
          :icon="CircleCloseFilled"
          iconColor="red"
          @confirm="deleteRow(scope.row)"
        >
          <a class="table-operator-btn">删除</a>
        </ProPopConfirm>
      </template>
    </ProTable>
    <ProDrawer
      :title="state.detailDrawerTitle"
      ref="detailDrawerRef"
      @confirm="confirmDetail"
    >
      <Detail ref="commDetailRef" :initData="state.initDetailData" />
    </ProDrawer>
    <ProDrawer title="批量导入" ref="importDrawerRef" @confirm="confirmImport">
      <Import ref="importRef" />
    </ProDrawer>
  </MainContentContainer>
</template>

<script setup lang="jsx">
import { reactive, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import MainContentContainer from "@/components/MainContentContainer.vue";
import ProDrawer from "@/components/ProDrawer.vue";
import ProPopConfirm from "@/components/ProPopConfirm.vue";
import { CircleCloseFilled } from "@element-plus/icons-vue";
import { ElTag } from "element-plus";
import Detail from "./components/detail.vue";
import Import from "./components/import.vue";

const COMMON_DATA_MAPS = [
  {
    checkBox: "",
    project: "项目",
    model: "XH456111361114587542",
    no: "ZC156464547589652321",
    type: "空调",
    desc: "技术参数技术参数技术参数技术参数技术参数技术参数技术参数技术参数技术参",
    time: "2023-05-12  15:21",
  },
  {
    checkBox: "",
    project: "项目",
    model: "XH456111361114587542",
    no: "ZC156464547589652321",
    type: "供配电",
    desc: "技术参数技术参数技术参数技术参数技术参数技术参数技术参数技术参数技术参",
    time: "2023-05-12  15:21",
  },
  {
    checkBox: "",
    project: "项目",
    model: "XH456111361114587542",
    no: "ZC156464547589652321",
    type: "照明",
    desc: "技术参数技术参数技术参数技术参数技术参数技术参数技术参数技术参数技术参",
    time: "2023-05-12  15:21",
  },
  {
    checkBox: "",
    project: "项目",
    model: "XH456111361114587542",
    no: "ZC156464547589652321",
    type: "动力",
    desc: "技术参数技术参数技术参数技术参数技术参数技术参数技术参数技术参数技术参",
    time: "2023-05-12  15:21",
  },
];

const detailDrawerRef = ref();
const commDetailRef = ref();
const importDrawerRef = ref();
const importRef = ref();
const state = reactive({
  searchFormData: {
    type: "all",
    deviceType: "all",
    number: "",
  },
  initDetailData: {},
  dataSource: [],
  loading: true,
  names: [{ id: "all", text: "全部项目名称" }],
  types: [{ id: "all", text: "全部设备类型" }],
  detailDrawerTitle: "",
  operateType: "",
});

const column = [
  {
    prop: "project",
    label: "设备型号名称",
    width: 110,
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.project}>
          <b>{scope.row.project}</b>
        </div>
      );
    },
  },
  {
    prop: "model",
    label: "型号规格",
    width: 150,
  },
  {
    prop: "no",
    label: "资产编号",
    width: 150,
  },
  {
    prop: "type",
    label: "设备类型",
    width: 100,
    render: (scope) => {
      const type = scope.row.type;
      let tagType = "";
      if (type === "空调") {
        tagType = "";
      } else if (type === "供配电") {
        tagType = "success";
      } else if (type === "照明") {
        tagType = "warning";
      } else if (type === "动力") {
        tagType = "danger";
      } else {
        tagType = "info";
      }
      return <ElTag type={tagType}>{type}</ElTag>;
    },
  },
  {
    prop: "desc",
    label: "技术参数",
    width: 210,
  },
  {
    prop: "time",
    label: "安装时间",
    // width: 100,
  },
];

const pageChange = (currentPage, pageSize) => {
  console.log(currentPage, pageSize);
};

const pageInfo = reactive({
  total: 100,
  currentPage: 1,
  pageSize: 10,
  pageSizes: [10, 15, 20, 50],
});

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

const addRow = () => {
  state.operateType = "add";
  state.detailDrawerTitle = "新增设备台帐";
  state.initDetailData = null;
  detailDrawerRef.value.open();
};

const imports = () => {
  importDrawerRef.value.open();
};

const editRow = (data) => {
  state.operateType = "edit";
  state.detailDrawerTitle = "编辑设备台帐";
  state.initDetailData = data;
  detailDrawerRef.value.open();
};

const deleteRow = (row) => {};

const confirmDetail = async () => {
  const res = await commDetailRef.value.validate();
  if (res) {
    // 配置新增/编辑逻辑
    if (state.operateType === "add") {
      state.dataSource.push(res);
    } else {
      const idx = state.dataSource.findIπndex((v) => v.id === res.id);
      state.dataSource.splice(idx, 1, res);
    }
    state.dataSource = [...state.dataSource];
    detailDrawerRef.value.close();
  }
};
const confirmImport = async () => {
  importDrawerRef.value.close();
};
</script>
<style lang="scss">
span.warn {
  color: rgba(255, 48, 0, 0.898039215686275);
}
</style>
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
