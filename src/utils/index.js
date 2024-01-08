/*
 * @Author: ymZhang
 * @Date: 2024-01-05 22:55:52
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-08 22:20:12
 * @Description: 
 */
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