<!--
 * @Author: ymZhang
 * @Date: 2024-01-13 17:37:53
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-13 18:11:13
 * @Description: 
-->
<template>
  <CommonContainer :title="`动态预警${alarms.length}`">
    <template #default>
      <div class="alarm-container" v-for="item in alarms" :key="item.year">
        <div class="title">{{ item.year }}</div>
        <div class="content">
          <div
            class="left"
            :style="{
              width: `${(item.target / (item.target + item.real)) * 100}%`,
            }"
          >
            {{ item.target }}
          </div>
          <div class="right">{{ item.real }}</div>
        </div>
        <div class="description">
          <div>目标净碳排量</div>
          <div>实际净碳排量</div>
        </div>
      </div>
    </template>
  </CommonContainer>
</template>
<script setup name="Alarm">
import CommonContainer from "./commonContainer.vue";
const props = defineProps({
  alarms: { type: Array, default: [] },
});
</script>
<style lang="scss" scoped>
.alarm-container {
  background: rgba(169, 192, 249, 0.2);
  border-radius: 10px;
  padding: 12px;
  margin-top: 10px;
  position: relative;
  &::after {
    content: "";
    width: 27px;
    height: 27px;
    border-radius: 50%;
    background: #f66;
    top: 23px;
    right: 10px;
    position: absolute;
  }
  .title {
    font-size: 14px;
    margin-bottom: 28px;
  }
  .content {
    color: #fff;
    display: flex;
    align-items: center;
    > div {
      height: 18px;
      line-height: 18px;
      font-size: 12px;
    }
    .left {
      background: rgba(43, 62, 177, 1);
      border-top-left-radius: 50px;
      border-bottom-left-radius: 50px;
      text-align: left;
      padding-left: 5px;
    }
    .right {
      background: #f69a3d;
      border-top-right-radius: 50px;
      border-bottom-right-radius: 50px;
      text-align: right;
      flex: 1;
      padding-right: 5px;
    }
  }
  .description {
    display: flex;
    align-items: center;
    justify-content: space-around;
    > div {
      flex: 1;
      line-height: 34px;
      &:first-child {
        color: rgba(43, 62, 177, 1);
        text-align: left;
      }
      &:last-child {
        color: #f69a3d;
        text-align: right;
      }
    }
  }
}
</style>
