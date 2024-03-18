import http from '@/api/http.js';

export const getSideBar = (params) => {
  return http.get(`web/carbon-reduce/calculate/side-bar`, { ...params });
}

export const getCarbonBase = (params) => {
  return http.get('web/carbon-reduce/calculate/carbon-base', params);
}

export const getCarbonReduce = (params) => {
  return http.get('web/carbon-reduce/calculate/carbon-reduce', params);
}

export const getCrBath = async (ids, otherParams) => {
  const res = await Promise.all(ids.map(id => getCarbonReduce({ carbonReduceStatisticsId: id, ...otherParams })));
  return res.reduce((last, resItem) => {
    return resItem?.data?.data.map((i, index) => {
      return { ...i, data: (last?.[index]?.data || 0) + (i?.data || 0) };
    });
  }, [])
}

