<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2024-01-05 21:31:33
 * @Description: 
-->
<template>
  <MainContentContainer>
    <ProTable
      :multiple="true"
      :column="column"
      :pageInfo="pageInfo"
      :datasource="dataSource"
      v-loading="loading"
      @page-change="pageChange"
      @sort-change="sortChange"
      @selection-change="selectionChange"
    >
      <template #toolbar>
        <el-row align="middle" :gutter="5">
          <el-col :span="4">
            <el-button type="primary" @click="addRow" v-auth="'project_add'"
              >新增</el-button
            >
            <el-button
              :disabled="!selectRows.length"
              @click="batchDelete"
              v-auth="'project_batch_delete'"
              >批量删除</el-button
            >
          </el-col>
          <el-col :offset="16" :span="4">
            <el-input
              clearable
              v-model="state.searchFormData.textQuery"
              placeholder="项目名称"
              :suffix-icon="Search"
              @keyup.enter="handleSearch"
            />
          </el-col>
        </el-row>
      </template>
      <template #operation="scope">
        <a
          class="table-operator-btn"
          v-auth="'project_edit'"
          @click="editRow(scope.row)"
          >编辑</a
        >
        <ProPopConfirm
          title="你确定要删除该项目嘛?"
          :icon="CircleCloseFilled"
          iconColor="red"
          @confirm="confirmDelete(scope.row)"
        >
          <a v-auth="'project_delete'" class="table-operator-btn">删除</a>
        </ProPopConfirm>
        <a
          v-auth="'project_upload_img'"
          class="table-operator-btn"
          @click="imageDrawerRef.open()"
          >项目图片</a
        >
        <a
          v-auth="'project_price_config'"
          class="table-operator-btn"
          @click="handleToPrice(scope.row)"
          >费用配置</a
        >
      </template>
    </ProTable>
    <ProDrawer
      :title="detailDrawerTitle"
      ref="detailDrawerRef"
      @confirm="confirmDetail"
    >
      <ProjectDetail ref="projectDetailRef" :initData="initDetailData" />
    </ProDrawer>
    <ProDrawer title="项目图片" ref="imageDrawerRef" @confirm="confirmImage">
      <ProjectImage ref="projectImageRef" />
    </ProDrawer>
    <ProDrawer title="费用配置" ref="priceDrawerRef" @confirm="confirmPrice">
      <PriceConfig ref="priceConfigRef" />
    </ProDrawer>
  </MainContentContainer>
</template>

<script setup lang="jsx">
import { ref, reactive } from "vue";
import { Search } from "@element-plus/icons-vue";
import ProTable from "@/components/ProTable.vue";
import ProDrawer from "@/components/ProDrawer.vue";
import ProjectDetail from "./projectDetail.vue";
import ProjectImage from "./projectImage.vue";
import PriceConfig from "./priceConfig.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import ProPopConfirm from "@/components/ProPopConfirm.vue";
import { CircleCloseFilled } from "@element-plus/icons-vue";
import MainContentContainer from "@/components/MainContentContainer.vue";
import useTable from '@/hooks/useTable.js';
import { deleteProject, getList, saveConfigPrice, saveProject } from '@/api/backstageMng/pmMng.js';
import { crudService } from '@/api/backstageMng/utils.js';

const selectRows = ref([]);
const operateType = ref("");
const imageDrawerRef = ref();
const priceDrawerRef = ref();
const detailDrawerRef = ref();
const priceConfigRef = ref();
const projectImageRef = ref();
const projectDetailRef = ref();
const detailDrawerTitle = ref("");
const initDetailData = ref(null);

const state = reactive({
  searchFormData: {
    textQuery: "",
  },
  sortInfo: { prop: "openTime", order: "descending" },
  initDetailData: {},
  currentData: {},
});

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

const addRow = () => {
  operateType.value = "add";
  detailDrawerTitle.value = "新增项目信息";
  initDetailData.value = null;
  detailDrawerRef.value.open();
};

const editRow = (data) => {
  operateType.value = "edit";
  detailDrawerTitle.value = "编辑项目信息";
  initDetailData.value = data;
  detailDrawerRef.value.open();
};

/**
 * 编辑/保存项目数据
 * @return {Promise<void>}
 */
const confirmDetail = async () => {
  const res = await projectDetailRef.value.validate();
  if (res) {
    await crudService(saveProject, res, () => {
      getTableList();
      detailDrawerRef.value.close();
    })
  }
};

/**
 * 打开费用配置
 * @param rowData
 */
const handleToPrice = (rowData) => {
  state.currentData = rowData;
  priceDrawerRef.value.open();
}

const confirmImage = async () => {
  const res = await projectImageRef.value.getPictures();
  if (res) {
    // 项目图片上传
    console.log(res);
    imageDrawerRef.value.close();
  }
};

/**
 * 保存费用配置
 * @return {Promise<void>}
 */
const confirmPrice = async () => {
  const res = await priceConfigRef.value.validate();
  if (res) {
    await crudService(saveConfigPrice, { ...res, projectId: state.currentData?.id }, () => {
      getTableList();
      priceDrawerRef.value.close();
    })
  }
};

const handleSearch = () => {
  searchChange(state.searchFormData);
};

/**
 * 项目删除逻辑
 * @param data
 */
const confirmDelete = async ({ id }) => {
  await crudService(deleteProject, { id }, getTableList)
};

const selectionChange = (data) => {
  selectRows.value = data;
};

/**
 * 批量删除 暂无接口
 */
const batchDelete = () => {
  ElMessageBox.confirm("确认删除选中的内容？", "警告", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      // 项目批量删除逻辑
      dataSource.value = dataSource.value.filter((v) => {
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
    prop: "name",
    label: "项目名称",
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.name}>
          <span className="table-first-col">{scope.row.name}</span>
        </div>
      );
    },
  },
  {
    prop: "region",
    label: "所在地区",
  },
  {
    prop: "area",
    label: "建筑面积(万平方米)",
  },
  {
    prop: "mode",
    label: "当前模式",
  },
  {
    prop: "openTime",
    label: "项目起始时间",
    sortable: "custom",
  },
];
</script>
