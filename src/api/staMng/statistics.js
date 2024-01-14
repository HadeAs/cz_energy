import http from '@/api/http.js';
import { commonResult } from '@/api/backstageMng/utils.js';

/**
 * 获取费用统计
 * @param params
 * @return {*}
 */
export const getCostSta = (params) => {
  return commonResult(`web/energy-cost/compare/query`, params, []);
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
  return commonResult(`web/device-data/export-in-batch`, params, []);
}


/**
 * 导出时间趋势图统计
 * @param params
 * @return {*}
 */
export const querySysClassSide = async (params) => {
  return commonResult(`web/energy-statistics/sys-class/side-bar`, params, []);
}

/**
 * 获取费用明细
 * @param params
 * @return {*}
 */
export const queryCostDetail = async (params) => {
  return commonResult(`web/energy-cost/detail/query`, params, []);
}
