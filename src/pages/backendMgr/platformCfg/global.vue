<!--
 * @Author: Zhicheng Huang
 * @Date: 2023-12-20 09:25:59
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-15 01:06:52
 * @Description: 
-->
<template>
  <div class="global-cfg-container">
    <MainContentContainer style="margin-bottom: 10px; overflow: unset">
      <div class="title">
        <el-icon class="pic-icon"><Platform /></el-icon>
        <span>大屏A数据配置</span>
      </div>
      <div class="config-item">
        <div class="config-item-title">
          <span>可再生能源利用量</span>
          <a class="table-operator-btn">编辑</a>
        </div>
        <div class="config-item-content">
          可再生能源利用量=地源热泵机组累计制冷量+地源热泵机组累计制热量
        </div>
      </div>
      <div class="config-item">
        <div class="config-item-title">
          <span>节约标煤量（kgce）</span>
          <a class="table-operator-btn">编辑</a>
        </div>
        <div class="config-item-content">
          节约标煤量（kgce）=0.326(kgce/kWh)*可再生能源利用量（kWh）
        </div>
      </div>
      <div class="config-item">
        <div class="config-item-title">
          <span>碳排放减量（kg）</span>
          <a class="table-operator-btn">编辑</a>
        </div>
        <div class="config-item-content">
          碳排放减量（kg）=0.795(kg/kWh)*可再生能源利用量（kWh）
        </div>
      </div>
    </MainContentContainer>
    <MainContentContainer style="overflow: unset">
      <div class="title">
        <el-icon class="pic-icon"><Platform /></el-icon>
        <span>大屏B数据配置</span>
      </div>
    </MainContentContainer>
  </div>
</template>

<script setup>
import { Platform } from "@element-plus/icons-vue";
import MainContentContainer from "@/components/MainContentContainer.vue";
</script>
<style lang="scss" scoped>
.global-cfg-container {
  .title {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    a {
    }
    span {
      margin-left: 10px;
      font-size: 16px;
      font-weight: bold;
    }
    .pic-icon {
      font-size: 18px;
      color: #2985f7;
    }
  }
  .config-item {
    margin-bottom: 15px;
    border: 1px solid #e3e3e3;
    border-radius: 3px;
    .config-item-title {
      padding: 10px 20px;
      background-color: rgba(236, 241, 249, 1);
      span {
        font-size: 14px;
        font-weight: bold;
      }
      a {
        float: right;
        color: rgba(255, 48, 0);
        cursor: pointer;
      }
    }
    .config-item-content {
      padding: 20px;
    }
  }
}
</style>
