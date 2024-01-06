/*
 * @Author: ymZhang
 * @Date: 2024-01-06 16:45:18
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-06 18:52:10
 * @Description: 
 */
import http from "../http";
import { COMMON_UPDATE_CONFIG, COMMON_JSON_CONFIG } from "../index";

export const PORT = "web";
export const getList = (params) => {
  return http.get(`${PORT}/device/query`, params);
}

export const getInfo = (params) => {
  return http.get(`${PORT}/device/find-one`, params);
}

export const updatePoint = (projectId, params) => {
  return http.post(`${PORT}/device/save?projectId=${projectId}`, params, { ...COMMON_UPDATE_CONFIG });
}

export const deletePoint = (projectId, params) => {
  return http.post(`${PORT}/device/delete?projectId=${projectId}`, params, { ...COMMON_UPDATE_CONFIG });
}

export const batchDeletePoint = (projectId, params) => {
  return http.post(`${PORT}/device/delete-in-batch?projectId=${projectId}`, JSON.stringify(params), { ...COMMON_JSON_CONFIG });
}