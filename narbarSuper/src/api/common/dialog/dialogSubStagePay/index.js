import request from '@/utilsCom/request';

/**
 * 阶段结算列表
 * */
export function getAllSubPay(params) {
  return request({
    url: '/api/bpma/bpmaSubStagePayMaster/page',
    method: 'get',
    params
  });
}
