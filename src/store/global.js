/*
 * @Author: Zhicheng Huang
 * @Date: 2023-12-19 17:28:18
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-31 13:32:01
 * @Description:
 */
import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import { getRoles, getProjectList, getCurrentResource, getResourceList } from "@/api/common";
import { handleResources } from "@/utils";

export const useGlobal = defineStore("global", () => {
  const globalState = reactive({
    projects: [],
    projectId: "",
    roleList: [],
    resourceList: [],
    authList: [],
    authInit: false,
    mock: false
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

  const getAllResource = async () => {
    const { data } = await getResourceList();
    globalState.resourceList = data?.data || [];
  }

  const getResources = async () => {
    const { data: resourceData } = await getCurrentResource();
    globalState.authInit = true;
    globalState.authList = handleResources(resourceData?.data);
  }

  const clear = () => {
    globalState.authInit = false;
    globalState.authList = [];
  }

  return { globalState, projectName, userRole, roleAuth, setProjects, changeName, getProjectId, getRoleList, getProList, getAllResource, getResources, clear };
});
