<!--
 * @Author: ymZhang
 * @Date: 2023-12-21 18:17:35
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-07 14:26:39
 * @Description: 
-->
<template>
  <MainContentContainer>
    <ProTable
      :column="column"
      :pageInfo="pageInfo"
      :default-sort="state.sortInfo"
      :datasource="dataSource"
      v-loading="loading"
      @page-change="pageChange"
      @sort-change="sortChange"
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
                <el-select
                  v-model="state.searchFormData.sysClassId"
                  placeholder="选择系统分类"
                  clearable
                  @change="handleSearchChange"
                >
                  <el-option
                    v-for="item in state.classifyList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-input
                  v-model="state.searchFormData.textQuery"
                  placeholder="设别名称/型号"
                  :suffix-icon="Search"
                  @change="handleSearchChange"
                />
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </template>
      <template #operation="scope">
        <a
          class="table-operator-btn"
          v-auth="'maintain_detail'"
          @click="viewDetail(scope.row)"
          >详情</a
        >
        <span
          class="table-operator-btn"
          v-auth="'maintain_edit'"
          @click="editRow(scope.row)"
          >编辑</span
        >
      </template>
    </ProTable>
    <ProDrawer title="编辑" ref="drawerRef" @confirm="confirmAddVar">
      <el-form
        ref="formRef"
        v-bind="COMMON_FORM_CONFIG"
        :model="state.formData"
        :rules="rules"
      >
        <el-form-item label="设备组名称" prop="name">
          <el-input v-model="state.formData.name" />
        </el-form-item>
        <el-form-item label="型号" prop="modelNum">
          <el-input
            v-model="state.formData.modelNum"
            placeholder="请输入型号"
          />
        </el-form-item>
        <el-form-item label="所属系统分类" prop="sysClassId">
          <el-select v-model="state.formData.sysClassId">
            <el-option
              v-for="item in state.classifyList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="设备数量" prop="equipmentCount">
          <el-input-number :min="0" v-model="state.formData.equipmentCount" />
        </el-form-item>
        <el-form-item label="计划保养时间" prop="maintainDate">
          <el-date-picker
            v-model="state.formData.maintainDate"
            type="daterange"
            start-placeholder="请选择开始日期"
            end-placeholder="请选择结束日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
      </el-form>
    </ProDrawer>
  </MainContentContainer>
</template>

<script setup lang="jsx">
import { reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { Search } from "@element-plus/icons-vue";
import MainContentContainer from "@/components/MainContentContainer.vue";
import ProDrawer from "@/components/ProDrawer.vue";
import { COMMON_FORM_CONFIG } from "@/constant/formConfig";
import { storeToRefs } from "pinia";
import appStore from "@/store";
import useTable from "@/hooks/useTable";
import { getList, getInfo } from "@/api/operationMgr/deviceMaintain";
import { getClassifyList } from "@/api/deviceMgr";

const { globalState } = storeToRefs(appStore.global);

const rules = {
  equipmentCount: {
    required: true,
    message: "请输入设备数量",
    trigger: "blur",
  },
  maintainDate: {
    required: true,
    message: "请选择计划保养时间",
    trigger: "blur",
  },
};

const router = useRouter();
const drawerRef = ref();
const formRef = ref();
const state = reactive({
  searchFormData: {
    textQuery: "",
    sysClassId: "",
    projectId: globalState.value.projectId,
  },
  formData: {
    name: "",
    modelNum: "",
    sysClassId: "",
    equipmentCount: null,
    maintainDate: [],
  },
  sortInfo: { prop: "startMaintainDate", order: "descending" },
  classifyList: [],
});

const column = [
  {
    prop: "name",
    label: "设备组名称",
    width: 150,
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.name}>
          <span className="table-first-col">{scope.row.name}</span>
        </div>
      );
    },
  },
  {
    prop: "modelNum",
    label: "型号",
    width: 200,
  },
  {
    prop: "sysClassName",
    label: "所属系统分类",
    width: 120,
  },
  {
    prop: "equipmentCount",
    label: "设备数量",
    width: 80,
    align: "center",
  },
  {
    prop: "startMaintainDate",
    label: "计划保养时间",
    width: 180,
    sortable: "custom",
    render: (scope) => {
      const start = scope.row.startMaintainDate;
      const end = scope.row.endMaintainDate;
      if (start || end) {
        return (
          <div>
            {start} ~ {end}
          </div>
        );
      }
      return null;
    },
  },
  {
    prop: "process",
    label: "保养进程",
    width: 220,
    render: (scope) => {
      const start = scope.row.maintainedCount || 0;
      const end = scope.row.equipmentCount || 0;
      const percentage = end !== 0 ? Number((start / end) * 100) : 0;
      return !isNaN(percentage) ? (
        <ElProgress
          percentage={percentage}
          color={
            percentage < 100 ? "rgba(41, 133, 247, 1)" : "rgba(0, 176, 80, 1)"
          }
        >
          <span className={percentage < 1 ? "warn" : ""}>{start}</span>/{end}
        </ElProgress>
      ) : null;
    },
  },
];

const getDeviceClassifyList = async () => {
  const { data } = await getClassifyList({
    projectId: state.searchFormData.projectId,
  });
  if (data?.data) {
    state.classifyList = data.data;
  }
};
getDeviceClassifyList();

const {
  dataSource,
  loading,
  pageInfo,
  pageChange,
  sortChange,
  searchChange,
  getTableList,
} = useTable(getList, state.searchFormData, state.sortInfo);

getTableList();

const handleSearchChange = () => {
  searchChange(state.searchFormData);
};

const getDeviceInfo = async (id) => {
  const { data } = await getInfo({
    projectId: state.searchFormData.projectId,
    equipmentId: id,
  });
  if (data?.data) {
    state.formData.sysClassId = data.data.sysClassId;
  }
};

const viewDetail = (row) => {
  const { id } = row;
  const path = router.resolve({
    name: "deviceDetail",
    params: {
      id,
      num: row.equipmentCount,
    },
  }).href;
  window.open(path, "_blank");
};
const editRow = (row) => {
  getDeviceInfo(row.id);
  state.formData.name = row.name;
  state.formData.modelNum = row.modelNum;
  state.formData.equipmentCount = row.equipmentCount;
  state.formData.maintainDate = [row.startMaintainDate, row.endMaintainDate];

  drawerRef.value.open();
};
const confirmAddVar = () => {
  formRef.value
    .validate()
    .then(() => {
      console.log("success");
      drawerRef.value.close();
    })
    .catch(() => {
      console.log("fail");
    });
};

const resetSearchForm = () => {
  state.searchFormData.textQuery = "";
  state.searchFormData.sysClassId = "";
  state.searchFormData.projectId = globalState.value.projectId;
  searchChange(state.searchFormData);
};

watch(
  () => globalState.value.projectId,
  () => {
    resetSearchForm();
    getDeviceClassifyList();
    getTableList();
  }
);
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
