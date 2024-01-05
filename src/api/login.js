/*
 * @Author: ymZhang
 * @Date: 2024-01-05 21:36:02
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-05 23:41:01
 * @Description: 
 */
import http from "./http";

export const PORT = "web";
export const COMMON_CONFIG = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
}
export const loginWithPwd = (params) => {
  return http.post(`${PORT}/login/username`, params, { ...COMMON_CONFIG });
}

export const getCode = (params) => {
  return http.post(`${PORT}/phone-code`, params, { ...COMMON_CONFIG });
}

export const loginWithPhone = () => {
  return http.post(`${PORT}/login/phone`, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}

export const checkToken = () => {
  return http.get(`${PORT}/check-token`)
}

export const logout = () => {
  return http.post(`${PORT}/logout`)
}