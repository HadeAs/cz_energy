import http from '@/api/http.js';
import { COMMON_UPDATE_CONFIG } from '@/api/index.js';
import { commonResult } from '@/api/backstageMng/utils.js';

// 瀑布图数据
export const getList = (params) => {
  if (!params?.standardId) return { data: { data: [] } };
  return http.get(`web/carbon-nt/calculate/query`, { ...params });
}

// 配置查询
export const getConfig = (params) => {
  return http.get(`web/carbon-nt/config/query`, { ...params });
}

// 查询变化前后电网碳排因子
export const getCarbonFactor = (params) => {
  if (!params?.standardId) return { data: { data: [] } };
  return http.get(`web/carbon-nt/carbon-factor-query`, { ...params });
}

// 配置碳信用抵消
export const postCredit = (params) => {
  return http.post(`web/carbon-nt/config/carbon-credit`, { ...params }, COMMON_UPDATE_CONFIG);
}

// 配置绿色家电购买抵消
export const postGreenPower = (params) => {
  return http.post(`web/carbon-nt/config/green-power`, { ...params }, COMMON_UPDATE_CONFIG);
}

// 碳达峰/碳中和

// 查询碳达峰/碳中和里程碑
export const getMilestone = (params) => {
  return commonResult(`web/carbon-nt/milestone/query`, { ...params }, []);
}

// 查询碳达峰/碳中和数据
export const getMainData = (params) => {
  return http.get(`web/carbon-nt/main/query`, { ...params });
}

// 查询碳达峰/碳中和目标
export const getTarget = (params) => {
  return http.get(`web/carbon-nt/nt-target/query`, { ...params });
}

// 添加碳达峰/碳中和里程碑
export const postMilestone = (params) => {
  return http.post(`web/carbon-nt/milestone/save`, { ...params }, COMMON_UPDATE_CONFIG);
}

// 删除碳达峰/碳中和里程碑
export const deleteMilestone = (params) => {
  return http.post(`web/carbon-nt/milestone/delete`, { ...params }, COMMON_UPDATE_CONFIG);
}

// 配置碳排放目标
export const postTarget = (params) => {
  return http.post(`web/carbon-nt/target/config`, { ...params }, COMMON_UPDATE_CONFIG);
}

// 配置碳达峰、中和目标
export const postNtTarget = (params) => {
  return http.post(`web/carbon-nt/nt-target/config`, { ...params }, COMMON_UPDATE_CONFIG);
}