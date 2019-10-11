import request from '@/utilsCom/request';

// 引入领用出库单-领用退货-物资
export function getUseOutStockData(data) {
  return request({
    url: '/api/bpma/bpmaMaterialOutUseMaster/getOutUseOrder/page',
    method: 'get',
    params: data
  });
}

// 引入领用出库单-领用退货-物品
export function getUseOutStockArticleData(data) {
  return request({
    url: '/api/brp/brpGoodsOutUseMaster/getOutUseOrder/page',
    method: 'get',
    params: data
  });
}
