/*
 * @Author: ymZhang
 * @Date: 2024-01-06 16:12:08
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-06 18:52:39
 * @Description: 
 */
import http from "../http";
import { COMMON_UPDATE_CONFIG } from "../index";

export const PORT = "web";

export const getList = (params) => {
  return http.get(`${PORT}/equipment/query`, params);
}
export const getInfo = (params) => {
  return http.get(`${PORT}/equipment/find-one`, params);
}
export const updateInfo = (projectId, params) => {
  return http.post(`${PORT}/device/save?projectId=${projectId}`, params, { ...COMMON_UPDATE_CONFIG });
}