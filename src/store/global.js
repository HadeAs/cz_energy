/*
 * @Author: Zhicheng Huang
 * @Date: 2023-12-19 17:28:18
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-06 11:30:35
 * @Description:
 */
import { ref, reactive } from "vue";
import { defineStore } from "pinia";

export const useGlobal = defineStore("global", () => {
  const globalState = reactive({
    projects: [],
    projectId: ""
  })
  const projectName = ref("");
  // 超级管理员角色
  const userRole = "1";
  // 模拟用户权限点
  const roleAuth = [];

  const setProjects = (projects) => {
    globalState.projects = projects;
  }
  const changeName = (val) => {
    globalState.projectId = val;
    projectName.value = val;
  };

  const getProjectId = () => {
    return globalState.projectId;
  }

  return { globalState, projectName, userRole, roleAuth, setProjects, changeName, getProjectId };
});
