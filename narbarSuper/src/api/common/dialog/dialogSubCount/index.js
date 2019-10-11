import request from 'utils/request';

/**
 * 计量单列表
 * */
export function getAllCount(params) {
  return request({
    url: '/api/bpma/bpmaSubCountMaster/page',
    method: 'get',
    params
  });
}
