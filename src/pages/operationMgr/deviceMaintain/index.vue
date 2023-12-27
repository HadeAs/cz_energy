<!--
 * @Author: ymZhang
 * @Date: 2023-12-21 18:17:35
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-27 13:47:53
 * @Description: 
-->
<template>
  <MainContentContainer>
    <ProTable
      :column="column"
      :pageInfo="pageInfo"
      :datasource="state.dataSource"
      :default-sort="{ prop: 'time', order: 'descending' }"
      v-loading="state.loading"
      @page-change="pageChange"
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
                <el-select v-model="state.searchFormData.classify">
                  <el-option
                    v-for="item in state.opts"
                    :key="item.id"
                    :label="item.text"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-input
                  v-model="state.searchFormData.type"
                  placeholder="设别名称/型号"
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
        <el-form-item label="设备组名称" prop="project">
          <el-input v-model="state.formData.project" />
        </el-form-item>
        <el-form-item label="型号" prop="type">
          <el-input v-model="state.formData.type" />
        </el-form-item>
        <el-form-item label="所属系统分类" prop="classify">
          <el-select v-model="state.formData.classify">
            <el-option
              v-for="item in state.classifyOpts"
              :key="item.id"
              :label="item.text"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="设备数量" prop="num">
          <el-input-number :min="0" v-model="state.formData.num" />
        </el-form-item>
        <el-form-item label="计划保养时间" prop="time">
          <el-date-picker
            v-model="state.formData.time"
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
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { Search } from "@element-plus/icons-vue";
import MainContentContainer from "@/components/MainContentContainer.vue";
import ProDrawer from "@/components/ProDrawer.vue";
import { COMMON_FORM_CONFIG } from "@/constant/formConfig";

const category_MAP = {
  0: "空调系统",
  1: "照明插座",
  2: "动力系统",
  3: "动力系统",
};

const COMMON_DATA_MAPS = [
  {
    project: "冷水机组",
    type: "X15",
    classify: 0,
    num: 15,
    time: "2023-01-15~2023-04-05",
    rate: 75,
    num1: 15,
    num2: 20,
  },
  {
    project: "冷水机组1",
    type: "X25",
    classify: 1,
    num: 15,
    time: "2023-02-11~2023-06-011",
    rate: 100,
    num1: 20,
    num2: 20,
  },
  {
    project: "冷水机组2",
    type: "X15",
    classify: 2,
    num: 15,
    time: "2023-03-12~2023-07-12",
    rate: 75,
    num1: 15,
    num2: 20,
  },
  {
    project: "冷水机组3",
    type: "X15",
    classify: 3,
    num: 15,
    time: "2023-04-13~2023-08-13",
    rate: 75,
    num1: 20,
    num2: 20,
  },
];

const rules = {
  num: { required: true, message: "请输入设备数量", trigger: "blur" },
  time: { required: true, message: "请选择计划保养时间", trigger: "blur" },
};

const router = useRouter();
const drawerRef = ref();
const formRef = ref();
const state = reactive({
  searchFormData: {
    type: "",
    classify: "all",
  },
  formData: {
    project: "",
    type: "",
    classify: "",
    num: null,
    time: [],
  },
  dataSource: [],
  loading: true,
  opts: [{ id: "all", text: "全部系统分类" }],
  classifyOpts: Object.values(category_MAP).map((key, index) => ({
    id: index,
    text: key,
  })),
});

const column = [
  {
    prop: "project",
    label: "设备组名称",
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
    prop: "type",
    label: "型号",
    width: 70,
  },
  {
    prop: "classify",
    label: "所属系统分类",
    render: (scope) => {
      return category_MAP[scope.row.classify];
    },
  },
  {
    prop: "num",
    label: "设备数量",
    width: 100,
  },
  {
    prop: "time",
    label: "计划保养时间",
    width: 200,
    sortable: true,
  },
  {
    prop: "num1",
    label: "保养进程",
    width: 220,
    render: (scope) => {
      const percentage = Number((scope.row.num1 / scope.row.num2) * 100);
      return !isNaN(percentage) ? (
        <ElProgress
          percentage={percentage}
          color={
            percentage < 100 ? "rgba(41, 133, 247, 1)" : "rgba(0, 176, 80, 1)"
          }
        >
          <span className={percentage < 1 ? "warn" : ""}>{scope.row.num1}</span>
          /{scope.row.num2}
        </ElProgress>
      ) : null;
    },
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
        return { ...COMMON_DATA_MAPS[i], id: index };
      });
      resolve(data);
    }, 600);
  });
  state.dataSource = res;
};
getList();

const viewDetail = (row) => {
  const { id } = row;
  const path = router.resolve({
    name: "deviceDetail",
    params: {
      id,
    },
  }).href;
  window.open(path, "_blank");
};
const editRow = (row) => {
  state.formData.project = row.project;
  state.formData.type = row.type;
  state.formData.classify = row.classify;
  state.formData.num = row.num;
  state.formData.time = row.time.split("~");
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
