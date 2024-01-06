/*
 * @Author: ymZhang
 * @Date: 2024-01-06 14:05:26
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-06 15:34:24
 * @Description: 
 */
import http from "../http";

export const PORT = "web";

export const getLiveList = (params) => {
  return http.get(`${PORT}/alarm/real-time/query`, params);
}

export const addLive = (projectId, params) => {
  return http.post(`${PORT}/alarm/real-time/save?projectId=${projectId}`, params);
}

export const handleLive = (projectId, params) => {
  return http.post(`${PORT}/alarm/real-time/handle?projectId=${projectId}`, params);
}

export const exportLive = (projectId, params) => {
  return http.post(`${PORT}/alarm/real-time/export-in-batch?projectId=${projectId}`, JSON.stringify(params), {
    headers: {
      'Content-Type': 'application/json'
    },
    responseType: 'blob'
  });
}