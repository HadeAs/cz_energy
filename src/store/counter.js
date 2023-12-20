/*
 * @Author: Zhicheng Huang
 * @Date: 2023-12-19 17:28:18
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-19 19:42:07
 * @Description:
 */
import { ref } from "vue";
import { defineStore } from "pinia";

export const useCounter = defineStore("counter", () => {
  const count = ref(1);
  function increment() {
    count.value++;
  }

  return { count, increment };
});
