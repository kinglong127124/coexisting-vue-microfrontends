import request from '@/utilsCom/request';

// 引入直进直出单-业务报销-物资
export function getBusinessReimbursementData(data) {
  return request({
    url: '/api/brp/brpGoodsInInoutMaster/page',
    method: 'get',
    params: data
  });
}

// 引入直进直出单-采购退货-物资
export function getPurchaseReturnData(data) {
  return request({
    url: '/api/bpma/bpmaMaterialInInoutMaster/getInInoutOrder/outBuyReturn/page',
    method: 'get',
    params: data
  });
}

// 引入直进直出单-领用退货-物资
export function getUseReturnData(data) {
  return request({
    url: '/api/bpma/bpmaMaterialInInoutMaster/getInInoutOrder/page',
    method: 'get',
    params: data
  });
}

// 引入直进直出单-采购退货-物品及引入直进直出单-领用退货-物品
export function getArticleData(data) {
  return request({
    url: '/api/brp/brpGoodsInInoutMaster/getInInoutOrder/page',
    method: 'get',
    params: data
  });
}
