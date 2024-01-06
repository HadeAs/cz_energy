/*
 * @Author: ymZhang
 * @Date: 2024-01-06 10:18:55
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-06 11:36:54
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