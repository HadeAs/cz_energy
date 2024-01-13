<!--
 * @Author: ymZhang
 * @Date: 2024-01-13 18:41:29
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-13 18:55:31
 * @Description: 
-->
<template>
  <CommonContainer title="碳中和路径框架" class="snap-shot">
    <template #default>
      <div class="snap-shot-container">
        <img :src="snapShot" />
        <div class="bg">
          <div>
            These platforms series are according to the ISO-14068&PAS 2080
          </div>
          <div @click="handleClick">查看</div>
        </div>
      </div>
      <el-image-viewer
        v-if="state.showPreview"
        :url-list="state.previewList"
        hide-on-click-modal
        @close="state.showPreview = false"
      />
    </template>
  </CommonContainer>
</template>
<script setup>
import { reactive } from "vue";
import CommonContainer from "./commonContainer.vue";
import snapShot from "@/assets/img/carbon/snapShot.png";

const props = defineProps({
  suggestions: { type: Array, default: [] },
});
const state = reactive({
  showPreview: false,
  previewList: [snapShot],
});
const handleClick = () => {
  state.showPreview = true;
};
</script>
<style lang="scss" scoped>
.snap-shot {
  margin-top: 10px;
  height: 100% !important;
}
.snap-shot-container {
  border-radius: 6px;
  margin-top: 10px;
  font-size: 13px;
  color: #fff;
  cursor: pointer;
  position: relative;
  img {
    width: 100%;
  }
  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(43, 62, 177, 0.6);
    padding: 12px;
    display: flex;
    flex-direction: column;
    border-radius: 6px;
    > div {
      &:first-child {
        flex: 1;
      }
      &:last-child {
        text-align: right;
      }
    }
  }
}
</style>
