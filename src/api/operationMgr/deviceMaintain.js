/*
 * @Author: ymZhang
 * @Date: 2024-01-07 13:04:10
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-08 11:10:36
 * @Description: 
 */
import http from "../http";
import { COMMON_EXPORT_CONFIG, COMMON_UPDATE_CONFIG, COMMON_SUBMIT_CONFIG } from "../index";

export const PORT = "web";
export const getList = (params) => {
  return http.get(`${PORT}/maintain/equipment-model/query`, params);
}

export const getInfo = (params) => {
  return http.get(`${PORT}/maintain/equipment/detail`, params);
}

export const setInterval = (projectId, params) => {
  return http.post(`${PORT}/maintain/equipment-model/set-interval?projectId=${projectId}`, params, { ...COMMON_UPDATE_CONFIG });
}

export const getDevicePlanList = (params) => {
  return http.get(`${PORT}/maintain/equipment/query`, params);
}

export const getDeviceMaintainRecords = (params) => {
  return http.get(`${PORT}/maintain/record/query`, params, { ...COMMON_SUBMIT_CONFIG });
}

export const addDeviceMaintainPlan = (projectId, params) => {
  return http.post(`${PORT}/maintain/record/save?projectId=${projectId}`, params, { ...COMMON_SUBMIT_CONFIG });
}

export const getLatestPlan = (params) => {
  return http.get(`${PORT}/maintain/plan/query`, params);
}

export const deletePlan = (projectId, params) => {
  return http.post(`${PORT}/maintain/plan/delete?projectId=${projectId}`, params, { ...COMMON_UPDATE_CONFIG });
}

export const addPlan = (projectId, params) => {
  return http.post(`${PORT}/maintain/plan/save?projectId=${projectId}`, params, { ...COMMON_UPDATE_CONFIG });
}

export const setFiveYearPlan = (projectId, params) => {
  return http.post(`${PORT}/maintain/plan/set-five-year?projectId=${projectId}`, params, { ...COMMON_UPDATE_CONFIG });
}