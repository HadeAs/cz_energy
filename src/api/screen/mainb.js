/*
 * @Author: ymZhang
 * @Date: 2024-01-22 10:24:14
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-23 19:13:03
 * @Description: 
 */
import http from '@/api/http.js';
import { COMMON_JSON_CONFIG, COMMON_SUBMIT_CONFIG, COMMON_UPDATE_CONFIG } from '@/api/index.js';

const PORT = "web";
export const querySummary = (params) => {
  return http.get(`${PORT}/index/energy-summaries/total-power`, params);
};

export const querySummaryType = (params) => {
  return http.get(`${PORT}/index/energy-summaries/energy-statistics`, params);
};

export const powerAnalysis = (params) => {
  return http.get(`${PORT}/index/sys-class-power-analysis`, params);
};

export const queryAasTrend = (params) => {
  return http.get(`${PORT}/index/gas-tendency-analysis`, params);
};

export const queryPowerTrend = (params) => {
  return http.get(`${PORT}/index/power-tendency-analysis`, params);
};

export const queryAlarm = (params) => {
  return http.get(`${PORT}/index/alarms`, params);
};

export const queryPowerRank = (params) => {
  return http.get(`${PORT}/index/equipment-power-rank`, params);
};

export const queryDeviceStatus = (params) => {
  return http.get(`${PORT}/index/equipment-status`, params);
};

export const getProjectInfo = (params) => {
  return http.get(`${PORT}/index/project-info`, params);
};