import request from 'utils/request';

/**
 * 用工单列表
 * */
export function getAllLabour(params) {
  return request({
    url: '/api/bpma/bpmaSubLaborPayMaster/page',
    method: 'get',
    params
  });
}
