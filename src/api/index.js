/*
 * @Author: ymZhang
 * @Date: 2024-01-06 18:45:36
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-06 18:51:49
 * @Description: 
 */
export const COMMON_SUBMIT_CONFIG = {
  headers: {
    "Content-Type": "multipart/form-data"
  }
}
export const COMMON_UPDATE_CONFIG = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
}

export const COMMON_JSON_CONFIG = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export const COMMON_EXPORT_CONFIG = {
  headers: {
    'Content-Type': 'application/json'
  },
  responseType: 'blob'
}