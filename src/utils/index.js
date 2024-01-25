/*
 * @Author: ymZhang
 * @Date: 2024-01-05 22:55:52
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-22 15:22:07
 * @Description: 
 */
import cloneDeep from "lodash/cloneDeep";
import dayjs from 'dayjs';
import appStore from "@/store";
import { COMMON_DATE_FORMAT } from "@/constant";
export * from "./cookies";

// 导出文件制作下载链接
export const exportWithExcel = (content, name, type = "xls") => {
  const elink = document.createElement("a");
  elink.download = `${name}.${type}`;
  elink.style.display = "none";
  const blob = new Blob([content], { type: type === "zip" ? "application/zip" : "application/x-msdownload" });
  elink.href = URL.createObjectURL(blob);
  document.body.appendChild(elink);
  elink.click();
  document.body.removeChild(elink);
}

// 多文件上传包装对象
export const wrapObjWithFormData = (param) => {
  const formData = new FormData();
  for (const key in param) {
    if (Array.isArray(param[key])) {
      param[key].forEach((item) => {
        formData.append(key, item);
      });
    } else {
      formData.append(key, param[key]);
    }
  }
  return formData;
}

// 文件流转string
export const transformFileToUrl = (file) => {
  const url = window.URL.createObjectURL(file);
  return url;
}

export const transformArrayToTree = (arr, parentKey, key, childKey = "children") => {
  const result = [];
  const obj = {};
  const data = cloneDeep(arr);
  data.forEach(item => {
    obj[item[key]] = Object.assign(item, obj[item[key]] || {});
    if (item[parentKey]) {
      const parent = obj[item[parentKey]] || {};
      parent[childKey] = parent[childKey] || [];
      parent[childKey].push(item);
      obj[item[parentKey]] = parent;
    } else {
      result.push(obj[item[key]])
    }
  })
  return result;
}

// 批量处理opts
export const handleOpts = (opts) => {
  const newOpts = cloneDeep(opts);
  // newOpts.yAxis[0].axisLabel.formatter = (data) => {
  //   if (data) return data;
  //   return ""
  // };
  newOpts.yAxis[0].nameTextStyle.padding = [0, 0, 0, 30];
  return newOpts;
}

export const getSearchNode = (nodeKeys = [], name) => {
  return {
    faId: nodeKeys?.[0]?.faId,
    childIds: nodeKeys?.map(i => i?.orgId),
  }
}

// 树形数据字段不一致，临时处理
export const renderTreeData = (data = [], names = [], faKey) => {
  return data.map((i, index) => ({
    ...i,
    id: String(index),
    label: i?.[names?.[0]],
    children: i?.children.map((child, ind) => ({
      ...child,
      id: `${index}-${ind}`,
      orgId: child?.id,
      faId: i?.[faKey],
      label: child?.[names?.[1]],
    }))
  }
  ));
};

export const renderAxis = (type, label) => {
  switch (type) {
    case "hour":
      return dayjs(label).format('HH');
    case "day":
      return dayjs(label).format('YYYY-MM-DD');
    case "month":
      return dayjs(label).format('YYYY-MM');
    case "year":
      return dayjs(label).format('YYYY');
    default:
      return dayjs(label).format('YYYY-MM-DD HH');
  }
};

export const formatXAxis = (value, type) => {
  let format = "";
  if (type === "hour") {
    format = "HH:mm";
  } else if (type === "day") {
    format = "MM-DD";
  } else if (type === "month") {
    format = "YYYY-MM";
  } else {
    format = "YYYY";
  }
  return dayjs(value).format(format)
};

export const getDefaultDate = (type) => {
  let startDate;
  const now = dayjs();
  const endDate = dayjs(now).format(COMMON_DATE_FORMAT) + " 23:59:59";
  if (type === "hour") {
    // 默认查询当前一天的数据
    startDate = dayjs(now).format(COMMON_DATE_FORMAT) + " 00:00:00";
  } else if (type === "day") {
    // 默认查询近7天的数据
    startDate = now.subtract(7, "day").format(COMMON_DATE_FORMAT) + " 00:00:00";
  } else if (type === "month") {
    // 默认查询最近12个月的数据
    startDate = now.subtract(1, "year").startOf("year").format(COMMON_DATE_FORMAT) + " 00:00:00";
  }
  return { startDate, endDate };
}

export const judgeIfMock = () => {
  return appStore.global.globalState.mock;
}
