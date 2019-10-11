import request from 'utils/request';

/**
 * 采购入库
 * */
export function getMaterialInBuyMaster(params) {
  return request({
    url: '/api/bpma/bpmaMaterialInBuyMaster/page',
    method: 'get',
    params
  });
}
