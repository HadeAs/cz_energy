/*
 * @Author: Zhicheng Huang
 * @Date: 2023-12-19 17:28:18
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2023-12-26 20:52:30
 * @Description:
 */
import { ref } from "vue";
import { defineStore } from "pinia";

export const useGlobal = defineStore("global", () => {
  const projectName = ref("");
  // 超级管理员角色
  const userRole = "1";
  // 模拟用户权限点
  const roleAuth = [];

  const changeName = (val) => {
    projectName.value = val;
  };

  return { projectName, userRole, roleAuth, changeName };
});
