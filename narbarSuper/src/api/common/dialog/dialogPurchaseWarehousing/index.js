import request from '@/utilsCom/request';

// 查询物资-采购入库单
export function getPurchaseWarehousingData(data) {
  return request({
    url: '/api/bpma/bpmaMaterialInBuyMaster/getPurchaseInOrder/page',
    method: 'get',
    params: data
  });
}

// 查询物品-采购入库单
export function getPurchaseWarehousingArticleData(data) {
  return request({
    url: '/api/brp/brpGoodsInBuyMaster/getPurchaseInOrder/page',
    method: 'get',
    params: data
  });
}

// 引入采购入库单-业务报销-物资
export function getBusinessReimbursementData(data) {
  return request({
    url: '/api/brp/brpGoodsInBuyMaster/page',
    method: 'get',
    params: data
  });
}
