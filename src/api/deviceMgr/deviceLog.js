/*
 * @Author: ymZhang
 * @Date: 2024-01-06 16:19:00
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-06 18:50:29
 * @Description: 
 */
import http from "../http";
import { COMMON_EXPORT_CONFIG } from "../index";

export const PORT = "web";

export const getList = (params) => {
  return http.get(`${PORT}/operation-log/query`, params);
}

export const exportLog = (projectId, params) => {
  return http.post(`${PORT}/operation-log/export-in-batch?projectId=${projectId}`, JSON.stringify(params), { ...COMMON_EXPORT_CONFIG });
}