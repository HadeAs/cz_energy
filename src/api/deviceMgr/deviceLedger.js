/*
 * @Author: ymZhang
 * @Date: 2024-01-06 00:03:17
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-06 18:53:03
 * @Description: 
 */
import http from "../http";
import { COMMON_UPDATE_CONFIG } from "../index"
// import { getProjectId } from "./index";

export const PORT = "web";
export const getList = (params) => {
  // const param = getProjectId(params);
  return http.get(`${PORT}/equipment-model/query`, params);
}

export const updateModel = (projectId, params) => {
  return http.post(`${PORT}/equipment-model/save?projectId=${projectId}`, params, { ...COMMON_UPDATE_CONFIG });
}

export const deleteModel = (projectId, param) => {
  return http.post(`${PORT}/equipment-model/delete?projectId=${projectId}`, param, { ...COMMON_UPDATE_CONFIG });
}