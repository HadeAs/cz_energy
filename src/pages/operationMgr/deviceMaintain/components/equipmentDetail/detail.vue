<!--
 * @Author: ymZhang
 * @Date: 2023-12-25 16:34:43
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-08 12:45:23
 * @Description: 
-->
<template>
  <BoxContainer class="equipment-box-detail" title="设备详情">
    <img src="@/assets/img/device/u6595.png" />
    <el-descriptions :column="3" size="default" border>
      <el-descriptions-item
        v-for="(item, index) in state.exclData"
        :key="index"
        :label="item.label"
        label-align="right"
        label-class-name="detail-label"
        class-name="content-label"
      >
        {{ item.value }}
      </el-descriptions-item>
    </el-descriptions>
  </BoxContainer>
</template>
<script setup name="Detail">
import { reactive } from "vue";
import BoxContainer from "../boxContainer.vue";
import { getInfo } from "@/api/operationMgr/deviceMaintain";

const props = defineProps({
  equipmentModelId: { type: String },
  equipmentId: { type: String },
  projectId: { type: String },
});

const state = reactive({
  exclData: [],
});

const getDetail = async () => {
  const { data } = await getInfo({
    projectId: props.projectId,
    equipmentId: props.equipmentId,
  });
  if (data.data) {
    const item = data.data;
    state.exclData = [
      { label: "设备名称", value: item.name },
      { label: "型号", value: item.modelNum },
      { label: "资产编号", value: item.propertyNum },
      { label: "设备位置", value: item.location },
      { label: "启用状态", value: item.status },
      {
        label: "计划保养时间",
        value: `${item.startMaintainDate} ~ ${item.endMaintainDate}`,
      },
      { label: "保养状态", value: item.maintainState },
      { label: "保养时间", value: item.maintainDate },
    ];
  }
};
getDetail();
</script>
<style lang="scss">
.equipment-box-detail {
  .cs-box-wrap {
    display: flex;
    align-items: center;
    img {
      width: 180px;
      height: 120px;
      flex-shrink: 0;
    }
  }
  .el-descriptions {
    flex: 1;
  }
  .el-descriptions__body
    .el-descriptions__table.is-bordered
    .el-descriptions__cell {
    padding: 8px 11px;
  }
  .detail-label {
    width: 150px;
    padding: 0 15px;
  }
  .content-label {
    min-width: 150px;
  }
}
</style>
