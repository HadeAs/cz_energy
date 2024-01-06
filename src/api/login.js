/*
 * @Author: ymZhang
 * @Date: 2024-01-05 21:36:02
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-06 18:53:56
 * @Description: 
 */
import http from "./http";
import { COMMON_UPDATE_CONFIG, COMMON_SUBMIT_CONFIG } from "./index";

export const PORT = "web";
export const loginWithPwd = (params) => {
  return http.post(`${PORT}/login/username`, params, { ...COMMON_UPDATE_CONFIG });
}

export const getCode = (params) => {
  return http.post(`${PORT}/phone-code`, params, { ...COMMON_UPDATE_CONFIG });
}

export const loginWithPhone = (params) => {
  return http.post(`${PORT}/login/phone`, params, { ...COMMON_SUBMIT_CONFIG });
}

export const checkToken = () => {
  return http.get(`${PORT}/check-token`)
}

export const logout = () => {
  return http.post(`${PORT}/logout`)
}