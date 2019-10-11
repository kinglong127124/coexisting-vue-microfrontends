import request from 'utils/request';

/**
 * 采购入库单列表
 * */
export function getMaterialInBuy(params) {
  return request({
    url: '/api/bpma/bpmaMaterialInBuyMaster/getList/page',
    method: 'get',
    params
  });
}
