<!--
 * @Description: 401
 * @Author: komo-zz
 * @Date: 2023-02-08 14:33:52
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-26 16:45:06
-->
<template>
  <div class="errPage-container">
    <div class="left-img">
      <img :src="errGif" width="229" height="269" alt="401" />
    </div>
    <div>
      <div class="text-ginormous">401</div>
      <div class="text-sorry">抱歉，你无权访问该页面</div>
    </div>
  </div>
</template>

<script setup>
import errImage from "@/assets/img/401.png";
import { ref } from "vue";

const errGif = ref(errImage + "?" + +new Date());
</script>
<style lang="scss">
.errPage-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .left-img {
    margin-right: 120px;
  }
  .text-ginormous {
    font-size: 98px;

    color: #434e59;
    font-weight: 600;
  }
  .text-sorry {
    font-size: 20px;
    color: rgba(0, 0, 0, 0.45);
    line-height: 28px;
    margin: 12px 0 16px;
  }
}
</style>
