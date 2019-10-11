import request from 'utils/request';

/**
 * 签证单列表
 * */
export function getAllVisa(params) {
  return request({
    url: '/api/bpma/bpmaSubVisaMaster/page',
    method: 'get',
    params
  });
}
