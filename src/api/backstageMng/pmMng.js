import http from "../http";
import { COMMON_UPDATE_CONFIG } from '@/api/index.js';
// import { getProjectId } from "./index";

export const PORT = "admin";
export const getList = (params) => {
  // const param = getProjectId(params);
  return http.get(`${PORT}/project/query`, params);
}

export const saveProject = (params) => {
  return http.post(`${PORT}/project/save`, JSON.parse(JSON.stringify(params)), { ...COMMON_UPDATE_CONFIG })
}

export const saveConfigPrice = (prams) => {
  return http.post(`${PORT}/project/cost-config`, prams, { ...COMMON_UPDATE_CONFIG })
}

export const deleteProject = (prams) => {
  return http.post(`${PORT}/project/delete`, prams, { ...COMMON_UPDATE_CONFIG })
}