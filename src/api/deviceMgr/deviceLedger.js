/*
 * @Author: ymZhang
 * @Date: 2024-01-06 00:03:17
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-12 19:59:51
 * @Description: 
 */
import http from "../http";
import { COMMON_UPDATE_CONFIG, COMMON_EXPORT_CONFIG } from "../index"

export const PORT = "web";
export const getList = (params) => {
  return http.get(`${PORT}/equipment-model/query`, params);
}

export const getInfo = (params) => {
  return http.get(`${PORT}/equipment-model/find-one`, params);
}

export const updateModel = (projectId, params) => {
  return http.post(`${PORT}/equipment-model/save?projectId=${projectId}`, params, { ...COMMON_UPDATE_CONFIG });
}

export const deleteModel = (projectId, param) => {
  return http.post(`${PORT}/equipment-model/delete?projectId=${projectId}`, param, { ...COMMON_UPDATE_CONFIG });
}

export const addDeviceParam = (projectId, param) => {
  return http.post(`${PORT}/equipment-model/params/save?projectId=${projectId}`, param, { ...COMMON_UPDATE_CONFIG });
}
export const delDeviceParam = (projectId, param) => {
  return http.post(`${PORT}/equipment-model/params/delete?projectId=${projectId}`, param, { ...COMMON_UPDATE_CONFIG });
}

export const batchExportDevice = (projectId, params) => {
  return http.post(`${PORT}/equipment-model/export-in-batch?projectId=${projectId}`, JSON.stringify(params), { ...COMMON_EXPORT_CONFIG });
}