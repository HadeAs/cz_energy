/*
 * @Author: ymZhang
 * @Date: 2024-01-06 10:24:14
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-06 17:55:21
 * @Description: 
 */
import http from './http';

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