<!--
 * @Author: ymZhang
 * @Date: 2023-12-26 13:27:07
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-11 14:48:36
 * @Description: 
-->
<template>
  <div class="container">
    <div class="title">技术参数</div>
    <el-form ref="formRef" :model="state.formValue" :rules="state.rules">
      <el-empty
        v-if="!Object.keys(state.formValue).length"
        description="暂无数据"
      />
      <template v-else>
        <div
          class="block"
          v-for="(item, index) in Object.keys(state.formValue)"
          :key="item"
        >
          <div class="block-title">
            <span class="left">参数{{ index + 1 }}: </span>
            <el-button class="del-btn" type="danger" text @click="delRule(item)"
              >删除</el-button
            >
          </div>
          <el-form-item label="参数名称" :prop="`${item}.name`">
            <el-input
              v-model="state.formValue[item].name"
              placeholder="请输入参数名称"
            />
          </el-form-item>
          <el-form-item label="参数内容" :prop="`${item}.value`">
            <el-input
              v-model="state.formValue[item].value"
              placeholder="请输入参数内容"
            />
          </el-form-item>
        </div>
      </template>
    </el-form>
    <el-button
      type="primary"
      plain
      class="add-btn"
      :icon="Plus"
      @click="addRule"
      >添加</el-button
    >
  </div>
</template>
<script setup name="Param">
import { reactive, watch, ref, onMounted } from "vue";
import { Plus } from "@element-plus/icons-vue";

const props = defineProps({
  params: { type: Array, default: [] },
});

const formRef = ref();
const initForm = (params) => {
  const param = {};
  params.forEach((item, index) => {
    param[index] = {
      ...item,
      name: item.name,
      value: item.value,
    };
  });
  return param;
};
const state = reactive({
  formValue: {},
  rules: {},
});

const updateRules = () => {
  const rules = {};
  Object.keys(state.formValue).forEach((key) => {
    rules[key] = {
      name: [
        {
          required: true,
          message: "请输入参数名",
          trigger: "blur",
        },
      ],
      value: [
        {
          required: true,
          message: "请输入参数值",
          trigger: "blur",
        },
      ],
    };
  });
  state.rules = rules;
};

const delRule = (key) => {
  delete state.formValue[key];
};
const addRule = () => {
  const randomKey = Math.floor(Math.random() * 100);
  state.formValue[`_${randomKey}`] = {
    name: "",
    value: "",
  };
};

onMounted(() => {
  state.formValue = initForm(props.params);
});

watch(
  () => Object.keys(state.formValue).length,
  () => {
    updateRules();
  }
);

const transformFormValues = () => {
  const params = [];
  const addParams = [];
  const editParams = [];
  Object.keys(state.formValue).forEach((key) => {
    const param = {
      ...state.formValue[key],
      name: state.formValue[key].name,
      value: state.formValue[key].value,
    };
    params.push(param);
    // add
    if (!param.id) {
      addParams.push(param);
    } else {
      const index = props.params.findIndex((v) => v.id === param.id);
      // edit
      if (
        index > -1 &&
        (param.name !== props.params[index].name ||
          param.value !== props.params[index].value)
      ) {
        editParams.push(param);
      }
    }
  });
  const ids = params.map((item) => item.id);
  const deleteParams = props.params.filter(
    (item) => !ids.includes(item.id) && item.equipmentModelId
  );
  return { addParams, editParams, deleteParams, params };
};

const getValue = async () => {
  let result;
  await formRef.value.validate((valid) => {
    if (valid) {
      result = transformFormValues();
    } else {
      result = false;
    }
  });
  return result;
};
defineExpose({ getValue });
</script>
<style lang="scss" scoped>
.container {
  .title {
    font-weight: bold;
    margin-bottom: 10px;
  }
  .block {
    background: #f5f7fd;
    padding: 10px 16px;
    margin-bottom: 10px;
    .block-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      span {
        font-weight: bold;
      }
    }
    .del-btn {
      padding-right: 0;
    }
  }
  .add-btn {
    width: 100%;
  }
}
</style>
