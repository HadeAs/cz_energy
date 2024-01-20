/*
 * @Author: ymZhang
 * @Date: 2024-01-16 10:36:42
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-20 12:01:45
 * @Description: 
 */
import http from "../http";
import { COMMON_EXPORT_CONFIG, COMMON_UPDATE_CONFIG, COMMON_SUBMIT_CONFIG, COMMON_JSON_CONFIG } from "../index";

export const PORT = "web";
export const getTreeList = (params) => {
  return http.get(`${PORT}/monitor-statistics/side-bar`, params);
}

export const queryTrend = (params) => {
  return http.get(`${PORT}/data-config/data-query/tendency`, params);
}

export const queryData = (params) => {
  return http.get(`${PORT}/data-config/query`, params);
}

export const getDataInfo = (params) => {
  return http.get(`${PORT}/data-config/find-one`, params);
}

export const updateDataInfo = (projectId, params) => {
  return http.post(`${PORT}/data-config/save?projectId=${projectId}`, params, { ...COMMON_JSON_CONFIG });
}

export const deleteDataInfo = (projectId, params) => {
  return http.post(`${PORT}/data-config/delete?projectId=${projectId}`, params, { ...COMMON_UPDATE_CONFIG });
}

export const exportData = (projectId, params) => {
  return http.get(`${PORT}/data-config/data-query/export-in-batch?projectId=${projectId}`, params, { ...COMMON_SUBMIT_CONFIG });
}

export const queryList = (params) => {
  return http.get(`${PORT}/alarm/real-time/water-query`, params);
}
