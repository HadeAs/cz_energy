import http from '@/api/http.js';

/**
 * 获取费用统计
 * @param params
 * @return {*}
 */
export const getCostSta = (params) => {
  return http.get(`web/analysis/cost-analysis`, params);
}

/**
 * 获取时间趋势图统计
 * @param params
 * @return {*}
 */
export const getDeviceSta = (params) => {
  return http.get(`web/device-data/query`, params);
}

/**
 * 导出时间趋势图统计
 * @param params
 * @return {*}
 */
export const exportDeviceSta = (params) => {
  return http.get(`web/device-data/export-in-batch`, params);
}