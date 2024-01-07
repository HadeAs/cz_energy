/*
 * @Author: Zhicheng Huang
 * @Date: 2023-12-19 19:13:50
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-07 16:39:01
 * @Description:
 */
const BasicRouter = [
  {
    path: "/login",
    name: "Login",
    hidden: true,
    component: () =>
      import(/* webpackChunkName: "loginPage" */ "@/pages/login/index.vue"),
  },
  {
    path: "/deviceDetail/:id/:num",
    name: "deviceDetail",
    component: () =>
      import(
        /* webpackChunkName: "deviceDetail" */ "@/pages/operationMgr/deviceMaintain/components/deviceDetail/index.vue"
      ),
  },
  {
    path: "/equipmentDetail/:id/:equipmentModelId",
    name: "equipmentDetail",
    component: () =>
      import(
        /* webpackChunkName: "equipmentDetail" */ "@/pages/operationMgr/deviceMaintain/components/equipmentDetail/index.vue"
      ),
  },
  {
    path: "/recycleBin",
    name: "recycleBin",
    component: () =>
      import(
        /* webpackChunkName: "recycleBin" */ "@/pages/deviceMgr/deviceGroupMgr/components/recycleBin/index.vue"
      ),
  },
];

export default BasicRouter;
