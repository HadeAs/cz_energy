import { commonResult } from '@/api/backstageMng/utils.js';
import { COMMON_SUBMIT_CONFIG } from '@/api/index.js';

/**
 * 获取能源数据侧边栏数据
 * @param params
 * @return {*}
 */
export const getClassSideBar = (params) => {
  return commonResult(`web/energy-statistics/sys-class/side-bar`, params, []);
}

/**
 * 获取能源数据侧边栏数据
 * @param params
 * @return {*}
 */
export const getEnergyActual = (params) => {
  return commonResult(`web/energy-statistics/sys-class/query`, params, []);
}

/**
 * 获取设备数据侧边栏数据
 * @param params
 * @return {*}
 */
export const getEquipmentSideBar = (params) => {
  return commonResult(`web/energy-statistics/equipment-type/side-bar`, params, []);
}

/**
 * 获取能源数据侧边栏数据
 * @param params
 * @return {*}
 */
export const getEqQsData = (params) => {
  return commonResult(`web/energy-statistics/equipment-type/query`, params, []);
}

/**
 * 导出实时历史趋势数据
 * @param params
 * @return {*}
 */
export const exportEnergyQsBatch = async (params) => {
  return commonResult(`web/energy-statistics/sys-class/export-in-batch`, params, [], { ...COMMON_SUBMIT_CONFIG });
}

/**
 * 导出设备趋势数据
 * @param params
 * @return {*}
 */
export const exportEquipmentQsBatch = async (params) => {
  return commonResult(`web/energy-statistics/equipment-type/export-in-batch`, params, [], { ...COMMON_SUBMIT_CONFIG });
}
