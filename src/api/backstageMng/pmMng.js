import http from "../http";
import { COMMON_JSON_CONFIG, COMMON_SUBMIT_CONFIG, COMMON_UPDATE_CONFIG } from '@/api/index.js';
import { commonResult } from '@/api/backstageMng/utils.js';
// import { getProjectId } from "./index";

export const PORT = "admin";
export const getList = (params) => {
  // const param = getProjectId(params);
  return http.get(`${PORT}/project/query`, params);
}

export const saveProject = (params) => {
  return http.post(`${PORT}/project/save`, params, { ...COMMON_JSON_CONFIG })
}

export const saveConfigPrice = (prams) => {
  return http.post(`${PORT}/project/cost-config?projectId=${prams?.projectId}`, prams?.list, { ...COMMON_JSON_CONFIG })
}

export const deleteProject = (prams) => {
  return http.post(`${PORT}/project/delete`, prams, { ...COMMON_UPDATE_CONFIG })
}

export const saveImages = (prams) => {
  return http.post(`${PORT}/project/upload-images`, prams, { ...COMMON_SUBMIT_CONFIG })
}

export const fetchOneProject = ({ id }) => {
  return http.get('admin/project/find-one', { id })
}

export const fetchProImg = ({ id }) => {
  return http.get('admin/project/find-images', { id })
}

export const queryProjectCost = ({ id }) => {
  return commonResult('admin/project/cost-query', { projectId: id }, [])
}
