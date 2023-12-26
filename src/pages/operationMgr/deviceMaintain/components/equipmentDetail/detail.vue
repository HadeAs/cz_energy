<!--
 * @Author: ymZhang
 * @Date: 2023-12-25 16:34:43
 * @LastEditors: ymZhang
 * @LastEditTime: 2023-12-25 20:57:05
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
import { useRoute } from "vue-router";
import BoxContainer from "../boxContainer.vue";

const route = useRoute();
const state = reactive({
  exclData: [
    { label: "设备名称", value: "某某设备" },
    { label: "型号", value: "X212" },
    { label: "资产编号", value: "AL264694" },
    { label: "设备位置", value: "空调主机—一楼主机机房" },
    { label: "启用状态", value: "启用" },
    { label: "计划保养时间", value: "2023-02-15—2023-05-15" },
    { label: "保养状态", value: "已保养" },
    { label: "保养时间", value: "2020-05-15" },
  ],
});
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
