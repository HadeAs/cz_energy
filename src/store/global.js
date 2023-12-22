/*
 * @Author: Zhicheng Huang
 * @Date: 2023-12-19 17:28:18
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-22 16:11:17
 * @Description:
 */
import { ref } from "vue";
import { defineStore } from "pinia";

export const useGlobal = defineStore("global", () => {
  const projectName = ref("");

  const changeName = (val) => {
    projectName.value = val;
  };

  return { projectName, changeName };
});
