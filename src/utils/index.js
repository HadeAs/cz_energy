/*
 * @Author: ymZhang
 * @Date: 2024-01-05 22:55:52
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-06 15:36:47
 * @Description: 
 */
export * from "./cookies";

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