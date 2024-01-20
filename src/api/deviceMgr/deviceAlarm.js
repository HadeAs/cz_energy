/*
 * @Author: ymZhang
 * @Date: 2024-01-06 14:05:26
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-20 13:20:58
 * @Description: 
 */
import http from "../http";
import { COMMON_EXPORT_CONFIG, COMMON_UPDATE_CONFIG, COMMON_SUBMIT_CONFIG } from "../index";

export const PORT = "web";

export const getLiveList = (params) => {
  return http.get(`${PORT}/alarm/real-time/query`, params);
}

export const addLive = (projectId, params) => {
  return http.post(`${PORT}/alarm/real-time/save?projectId=${projectId}`, params, { ...COMMON_UPDATE_CONFIG });
}

export const handleLive = (projectId, params) => {
  return http.post(`${PORT}/alarm/real-time/handle?projectId=${projectId}`, params, { ...COMMON_SUBMIT_CONFIG });
}

export const exportLive = (projectId, params) => {
  return http.post(`${PORT}/alarm/real-time/export-in-batch?projectId=${projectId}`, JSON.stringify(params), { ...COMMON_EXPORT_CONFIG });
}

export const getRunList = (params) => {
  return http.get(`${PORT}/alarm/run/query`, params);
}

export const addRecord = (projectId, params) => {
  return http.post(`${PORT}/alarm/run/modify?projectId=${projectId}`, params, { ...COMMON_UPDATE_CONFIG });
}