import request from 'utils/request';

/**
 * 索赔单列表
 * */
export function getAllClaim(params) {
  return request({
    url: '/api/bpma/bpmaSubClaimMaster/page',
    method: 'get',
    params
  });
}
