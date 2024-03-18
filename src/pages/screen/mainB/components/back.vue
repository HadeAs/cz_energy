<!--
 * @Author: Zhicheng Huang
 * @Date: 2024-01-04 17:18:46
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-22 12:44:39
 * @Description: 
-->
<template>
  <div class="cs-box-content content">
    <div class="cs-left-wrap1">
      <el-button class="btn btn-lg" type="primary" id="backMain" @click="back"
        >返回
      </el-button>
      <div class="pull-right back-container">
        <UnitSelect
          :options="state.projectList"
          :default-value="state.active"
          @change="handleChange"
          width="160px"
        />
        <el-button
          type="primary"
          class="btn btn-lg"
          id="search"
          @click="handleSearch"
          >搜索</el-button
        >
      </div>
    </div>
  </div>
</template>
<script setup name="Summary">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import UnitSelect from "../../mainA/components/unitSelect.vue";
import { storeToRefs } from "pinia";
import appStore from "@/store";

const emits = defineEmits(["search"]);
const { globalState } = storeToRefs(appStore.global);
const router = useRouter();
const state = reactive({
  projectList: globalState.value.projects.map((item) => ({
    ...item,
    text: item.name,
  })),
  active: globalState.value.projectId,
});

const handleChange = (select) => {
  state.active = select;
};

const handleSearch = () => {
  emits("search", state.active);
};

const back = () => {
  router.go(-1);
};
</script>
<style lang="scss" scoped>
.content {
  height: 74px;

  .cs-left-wrap1 .btn-lg {
    height: 38px;
    line-height: 36px;
    padding: 0 24px;
    font-size: 14px;
  }

  .cs-left-wrap1 #search {
    border-radius: 0 3px 3px 0;
  }

  .cs-left-wrap1 .select2 .select2-selection {
    height: 38px;
  }

  .cs-left-wrap1 .select2 .select2-selection__rendered {
    color: #fff !important;
    font-weight: normal;
    line-height: 36px !important;
  }

  .cs-left-wrap1 .select2 .select2-selection__arrow b {
    top: 9px !important;
  }

  .back-container {
    :deep() {
      .el-input {
        height: 38px;
      }
    }
  }
}
</style>
