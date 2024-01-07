import http from '@/api/http.js';
import { COMMON_UPDATE_CONFIG } from '@/api/index.js';

// 建筑类型
export const getBuildingTypeList = (params) => {
  return http.get(`admin/building-type/query`, params);
}

export const updateBuildingType = (params) => {
  return http.post('admin/building-type/save', params, { ...COMMON_UPDATE_CONFIG })
}

export const deleteBuildingType = (params) => {
  return http.post('admin/building-type/delete', params, { ...COMMON_UPDATE_CONFIG })
}

// 单位
export const getDeviceTemplateList = (params) => {
  return http.get(`admin/device-template/query`, params);
}

export const updateDeviceTemplate = (params) => {
  return http.post('admin/device-template/save', params, { ...COMMON_UPDATE_CONFIG })
}

export const deleteDeviceTemplate = (params) => {
  return http.post('admin/device-template/delete', params, { ...COMMON_UPDATE_CONFIG })
}

// 系统
export const getSysClassList = (params) => {
  return http.get(`admin/sys-class/query`, params);
}

export const updateSysClass = (params) => {
  return http.post('admin/sys-class/save', params, { ...COMMON_UPDATE_CONFIG })
}

export const deleteSysClass = (params) => {
  return http.post('admin/sys-class/delete', params, { ...COMMON_UPDATE_CONFIG })
}

// 变量
export const getStatisticsTypeList = (params) => {
  return http.get(`admin/statistics-type/query`, params);
}

export const updateStatisticsType = (params) => {
  return http.post('admin/statistics-type/save', params, { ...COMMON_UPDATE_CONFIG })
}

export const deleteStatisticsType = (params) => {
  return http.post('admin/statistics-type/delete', params, { ...COMMON_UPDATE_CONFIG })
}