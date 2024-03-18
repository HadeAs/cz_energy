/*
 * @Author: ymZhang
 * @Date: 2024-01-05 20:49:06
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-16 21:13:14
 * @Description: 
 */
import { defineStore } from "pinia";
import { reactive } from "vue";
import { logout } from "@/api/login";
import { useGlobal } from "./global";
// import isEqual from "lodash/isEqual";

export const useUserStore = defineStore("user", () => {
  const userState = reactive({
    token: "",
    userInfo: {}
  });
  const setToken = (token) => {
    userState.token = token;
  }
  const setUserInfo = (userInfo) => {
    // if (!isEqual(userInfo, userState.userInfo)) {
    userState.userInfo = userInfo;
    // }
  }

  const clear = () => {
    const useGlobalInstance = useGlobal();
    setUserInfo({});
    useGlobalInstance.clear();
  }

  const userLogout = () => {
    logout();
    clear();
  }

  return { userState, setToken, setUserInfo, userLogout, clear };
});
