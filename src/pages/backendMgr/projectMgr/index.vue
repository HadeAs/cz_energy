<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-26 21:02:44
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
            <el-button type="primary" @click="addRow" v-auth="'project_add'"
              >新增</el-button
            >
          </el-col>
          <el-col :span="2">
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
              v-model="projName"
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
          @click="priceDrawerRef.open()"
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
import { ref, onMounted } from "vue";
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

const projName = ref("");
const loading = ref(false);
const datasource = ref([]);
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
const pageInfo = ref({
  total: 4,
  currentPage: 1,
  pageSize: 10,
  pageSizes: [10, 15, 20, 50],
});

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

const confirmDetail = async () => {
  const res = await projectDetailRef.value.validate();
  if (res) {
    // 项目新增/编辑逻辑
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

const confirmImage = async () => {
  const res = await projectImageRef.value.getPictures();
  if (res) {
    // 项目图片上传
    console.log(res);
    imageDrawerRef.value.close();
  }
};

const confirmPrice = async () => {
  const res = await priceConfigRef.value.validate();
  if (res) {
    // 费用配置确认逻辑
    priceDrawerRef.value.close();
  }
};

const handleSearch = () => {
  console.log(projName.value);
};

const confirmDelete = (data) => {
  // 项目删除逻辑
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
      // 项目批量删除逻辑
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
    prop: "projectName",
    label: "项目名称",
    render: (scope) => {
      return (
        <div className="text-overflow" title={scope.row.projectName}>
          <b>{scope.row.projectName}</b>
        </div>
      );
    },
  },
  {
    prop: "district",
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
    prop: "startTime",
    label: "项目起始时间",
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
          projectName: "项目001",
          mode: "供暖",
          startTime: "2016-05-03",
          district: "南京",
          area: "4",
        },
        {
          id: "2",
          projectName: "项目002",
          mode: "供冷",
          startTime: "2016-05-02",
          district: "南京",
          area: "4",
        },
        {
          id: "3",
          projectName: "项目003",
          mode: "供暖",
          startTime: "2016-05-04",
          district: "南京",
          area: "4",
        },
        {
          id: "4",
          projectName: "项目004",
          mode: "供冷",
          startTime: "2016-05-01",
          district: "南京",
          area: "4",
        },
      ]);
    }, 1000);
  });
  datasource.value = res;
});
</script>
