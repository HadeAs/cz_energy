/*
 * @Author: Zhicheng Huang
 * @Date: 2023-12-19 17:28:18
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-07 12:13:03
 * @Description:
 */
import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import { getRoles, getProjectList } from "@/api/common";

export const useGlobal = defineStore("global", () => {
  const globalState = reactive({
    projects: [],
    projectId: "",
    roleList: []
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

  const getProList = async () => {
    const { data } = await getProjectList();
    if (data?.data) {
      setProjects(data.data);
      changeName(data.data[0].id);
    }
  }

  const getRoleList = async () => {
    const { data } = await getRoles();
    globalState.roleList = data.data;
  }

  return { globalState, projectName, userRole, roleAuth, setProjects, changeName, getProjectId, getRoleList, getProList };
});
