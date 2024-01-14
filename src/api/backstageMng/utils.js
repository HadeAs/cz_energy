import http, { ResultEnum } from '@/api/http.js';

export const crudService = async (service, params = {}, callbackSuccess = () => {}, callbackError = () => {}) => {
  if (!service) return;
  const res = await service(params);
  if (res && res?.code === ResultEnum.SUCCESS) {
    callbackSuccess?.(res);
    return;
  }
  callbackError?.(res);
}

export const ifSuccess = (res, callback) => {
  if (res && res?.code === ResultEnum.SUCCESS) {
    callback?.();
  }
}

export const isSuccess = (res) => res?.code === ResultEnum.SUCCESS;

export const commonResult = async (asyncFun, params, defaultResult) => {
  const res = await http.get(asyncFun, params);
  return isSuccess(res) ? res?.data?.data : defaultResult
}