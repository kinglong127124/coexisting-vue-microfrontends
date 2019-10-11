import request from 'utils/request';

/**
 * 奖励单列表
 * */
export function getAllAward(params) {
  return request({
    url: '/api/bpma/bpmaSubAwardMaster/page',
    method: 'get',
    params
  });
}
