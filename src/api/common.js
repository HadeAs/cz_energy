/*
 * @Author: ymZhang
 * @Date: 2024-01-06 10:24:14
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-20 13:58:50
 * @Description: 
 */
import http from './http';
import { COMMON_SUBMIT_CONFIG } from "./"
import { commonResult } from '@/api/backstageMng/utils.js';
export const PORT = "common";
// 获取项目列表
export const getProjectList = () => {
  return http.get(`${PORT}/project/name-list`);
}

// 获取角色列表
export const getRoles = () => {
  return http.get(`${PORT}/role/name-list`);
}

// 获取网关列表
export const getGatewayList = () => {
  return http.get(`${PORT}/gateway/name-list`);
}

// 获取单位列表
export const getUnitList = () => {
  return http.get(`${PORT}/device-template/name-list`);
}

// 根据层级获取变量类型列表
export const getVariablesByLevel = (param) => {
  return http.get(`${PORT}/statistics-type/name-list`, param);
}

// 根据父节点获取变量类型列表
export const getVariablesByParent = (param) => {
  return http.get(`${PORT}/statistics-type/name-list/parent-id`, param);
}

// 获取图片URL
export const getImageUrl = (url) => {
  return http.get(`images/${url}`, null, {
    baseURL: "/static",
    ...COMMON_SUBMIT_CONFIG,
    responseType: 'blob'
  });
}

// 获取报警凭证
export const getDeviceAlarmProve = (url) => {
  return http.get(`alarm-handle-appendix/${url}`, null, {
    baseURL: "/static",
    ...COMMON_SUBMIT_CONFIG,
    responseType: 'blob',
    "response-content-type": "application/octet-stream"
  });
}

// 获取保养附件
export const getDevicePlanFile = (url) => {
  return http.get(`maintain-appendix/${url}`, null, {
    baseURL: "/static",
    ...COMMON_SUBMIT_CONFIG,
    responseType: 'blob',
    "response-content-type": "application/octet-stream",
  });
}

// 建筑分类
export const getBuildingType = (param) => {
  return http.get(`${PORT}/building-type/name-list`, param);
}

// 系统类别
export const getSysClass = (param) => {
  return commonResult(`${PORT}/sys-class/name-list`, param, []);
}

// 获取系统内权限列表
export const getResourceList = (params = {}) => {
  return http.get(`admin/resource/name-list`, params);
}

// 获取当前用户的权限
export const getCurrentResource = () => {
  return http.get(`${PORT}/resource/level-list`);
}

// 获取系统中用能类型列表
export const getEnergyList = () => {
  return http.get(`${PORT}/energy-statistics/name-list`);
}

// 获取省份列表
export const getProvinceList = () => {
  return http.get(`common/provinces`);
}

// 获取省份列表
export const getCityByProvinceId = (province) => {
  return http.get(`common/cities`, province);
}

// 获取系统中碳排放因子列表
export const getCarbonTpyList = (params) => {
  return http.get(`common/carbon-statistics/name-list`, params);
}

// 获取系统中碳排放标准列表
export const getCarbonStandardList = (params) => {
  return http.get(`common/carbon-standard/name-list`, params, COMMON_SUBMIT_CONFIG);
}

// 获取系统中碳排放标准列表
export const getCarbonReduceList = (params) => {
  return http.get(`common/carbon-reduce-statistics/name-list`, params, COMMON_SUBMIT_CONFIG);
}
