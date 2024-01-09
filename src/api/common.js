/*
 * @Author: ymZhang
 * @Date: 2024-01-06 10:24:14
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-08 14:32:28
 * @Description: 
 */
import http from './http';
import { COMMON_SUBMIT_CONFIG } from "./"
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

// 建筑分类
export const getBuildingType = (param) => {
  return http.get(`${PORT}/building-type/name-list`, param);
}

// 系统类别
export const getSysClass = (param) => {
  return http.get(`${PORT}/sys-class/name-list`, param);
}
