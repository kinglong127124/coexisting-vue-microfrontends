import request from 'utils/request';

/**
 * 采购退货单列表
 * */
export function getMaterialOutBuyReturn(params) {
  return request({
    url: '/api/bpma/bpmaMaterialOutBuyReturnMaster/getList/page',
    method: 'get',
    params
  });
}
