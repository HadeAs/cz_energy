/*
 * @Author: ymZhang
 * @Date: 2024-01-06 16:12:08
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-07 11:29:09
 * @Description: 
 */
import http from "../http";
import { COMMON_UPDATE_CONFIG, COMMON_SUBMIT_CONFIG, COMMON_JSON_CONFIG, COMMON_EXPORT_CONFIG } from "../index";

export const PORT = "web";

export const getList = (params) => {
  return http.get(`${PORT}/equipment/query`, params);
}
export const getInfo = (params) => {
  return http.get(`${PORT}/equipment/find-one`, params);
}
export const updateInfo = (projectId, params) => {
  return http.post(`${PORT}/equipment/save?projectId=${projectId}`, params, { ...COMMON_SUBMIT_CONFIG });
}

export const deleteDevice = (projectId, params) => {
  return http.post(`${PORT}/equipment/delete?projectId=${projectId}`, params, { ...COMMON_UPDATE_CONFIG });
}
export const batchDeleteDevice = (projectId, params) => {
  return http.post(`${PORT}/equipment/delete-in-batch?projectId=${projectId}`, JSON.stringify(params), { ...COMMON_JSON_CONFIG });
}

export const recoverDevice = (projectId, params) => {
  return http.post(`${PORT}/equipment/restore?projectId=${projectId}`, params, { ...COMMON_UPDATE_CONFIG });
}

export const bindDevice = (projectId, params) => {
  return http.post(`${PORT}/equipment/bind-device?projectId=${projectId}`, JSON.stringify(params), { ...COMMON_JSON_CONFIG });
}

export const batchExportDevice = (projectId, params) => {
  return http.post(`${PORT}/equipment/export-in-batch?projectId=${projectId}`, JSON.stringify(params), { ...COMMON_EXPORT_CONFIG });
}