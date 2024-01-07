import { ResultEnum } from '@/api/http.js';

export const crudService = async (service, params = {}, callbackSuccess = () => {}, callbackError = () => {}) => {
  if (!service) return;
  const res = await service(params);
  if (res && res?.code === ResultEnum.SUCCESS) {
    callbackSuccess?.(res);
    return;
  }
  callbackError?.(res);
}