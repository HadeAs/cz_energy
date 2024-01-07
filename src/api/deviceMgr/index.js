/*
 * @Author: ymZhang
 * @Date: 2024-01-06 10:18:55
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-07 10:53:52
 * @Description: 
 */
import http from "../http";
import appStore from "@/store";

export const PORT = "web";
export const getProjectId = (params) => {
  const projectId = appStore.global.getProjectId();
  return params ? { ...params, projectId } : { projectId }
}
// 获取项目下设备型号列表
export const getEquipmentModelList = (params) => {
  // const param = getProjectId();
  return http.get(`${PORT}/equipment-model/name-list`, params);
}

// 获取项目下设备名称列表
export const getEquipmentList = (params) => {
  return http.get(`${PORT}/equipment/name-list`, params);
}

// 获取项目下设备类型列表
export const getEquipmentTypeList = (params) => {
  return http.get(`${PORT}/equipment-type/name-list`, params);
}

// 获取项目下系统类别列表
export const getClassifyList = (params) => {
  return http.get(`${PORT}/sys-class/name-list`, params);
}

// 获取项目下采集点列表
export const getCollectList = (params) => {
  return http.get(`${PORT}/device/name-list`, params);
}