/*
 * @Author: ymZhang
 * @Date: 2024-01-05 20:49:06
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-05 23:34:57
 * @Description: 
 */
import { defineStore } from "pinia";
import { reactive } from "vue";
import { logout } from "@/api/login";

export const useUserStore = defineStore("user", () => {
  const userState = reactive({
    token: "",
    userInfo: {}
  });
  const setToken = (token) => {
    userState.token = token;
  }
  const setUserInfo = (userInfo) => {
    userState.userInfo = userInfo;
  }

  const userLogout = () => {
    logout();
    setUserInfo({});
  }

  return { userState, setToken, setUserInfo, userLogout };
});