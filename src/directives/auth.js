/*
 * @Author: Zhicheng Huang
 * @Date: 2023-12-26 16:07:13
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-31 13:11:29
 * @Description:
 */
// import appStore from "@/store";
// import { AUTH_POINT_CONFIG } from "@/constant";

// const findAuthFromMenuData = (authName) => {
//   const names = authName.split("_");
//   let targetMenu = "";
//   AUTH_POINT_CONFIG.some(item => {
//     targetMenu = (item.children || []).find(v => v.key === names[0]);
//     if (targetMenu) return true;
//     return false;
//   });
//   if (targetMenu) {
//     const targetKey = (targetMenu.children || []).find(item => item.key === authName);
//     if (targetKey.authKey) {
//       return targetKey.authKey;
//     }
//   }
//   return false;
// }
export default function (el, binding) {
  // 暂时隐藏三级权限处理
  // 这会在 `mounted` 和 `updated` 时都调用
  // if (!binding.value) return;
  // const authKey = findAuthFromMenuData(binding.value);
  // if (!authKey) return;
  // const roleAuth = appStore.global.globalState.authList;
  // const accessable = roleAuth.includes(authKey);
  // //  没有权限
  // if (!accessable) {
  //   el.style.display = "none";
  //   // if (el.type === "button") {
  //   //   el.disabled = true;
  //   // } else {
  //   //   el.style.display = "none";
  //   // }
  // }
  return
}
