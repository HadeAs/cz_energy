/*
 * @Author: Zhicheng Huang
 * @Date: 2023-12-26 16:07:13
 * @LastEditors: Zhicheng Huang
 * @LastEditTime: 2024-01-03 10:22:59
 * @Description:
 */
import appStore from "@/store";

export default function (el, binding) {
  // 这会在 `mounted` 和 `updated` 时都调用
  const roleAuth = appStore.global.roleAuth;
  const userRole = appStore.global.userRole;
  const accessable = roleAuth.includes(binding.value);
  //没有权限且不是超级管理员
  if (!accessable && userRole !== "1") {
    if (el.type === "button") {
      el.disabled = true;
    } else {
      el.style.display = "none";
    }
  }
}
