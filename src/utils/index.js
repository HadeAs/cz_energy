/*
 * @Author: ymZhang
 * @Date: 2024-01-05 22:55:52
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-15 01:37:03
 * @Description: 
 */
import cloneDeep from "lodash/cloneDeep";

export * from "./cookies";

// 导出文件制作下载链接
export const exportWithExcel = (content, name) => {
  const elink = document.createElement("a");
  elink.download = `${name}.xls`;
  elink.style.display = "none";
  const blob = new Blob([content], { type: "application/x-msdownload" });
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