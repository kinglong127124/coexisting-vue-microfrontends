import request from 'utils/request';

/**
 * 扣罚单列表
 * */
export function getAllPunish(params) {
  return request({
    url: '/api/bpma/bpmaSubPunishMaster/page',
    method: 'get',
    params
  });
}
