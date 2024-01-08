/*
 * @Author: Zhicheng Huang
 * @Date: 2023-12-19 19:13:50
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-08 12:01:38
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
    path: "/deviceDetail/:projectId/:id/:num",
    name: "deviceDetail",
    component: () =>
      import(
        /* webpackChunkName: "deviceDetail" */ "@/pages/operationMgr/deviceMaintain/components/deviceDetail/index.vue"
      ),
  },
  {
    path: "/equipmentDetail/:projectId/:id/:equipmentModelId",
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
