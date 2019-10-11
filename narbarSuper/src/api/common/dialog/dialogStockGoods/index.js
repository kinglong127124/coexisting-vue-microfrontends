import request from '@/utilsCom/request';

export function getStockGoodsData(data) {
  return request({
    url: '/api/bpma/bpmaMaterialInStock/getStockList/page',
    method: 'get',
    params: data
  });
}
export function getStockGoodsArticleData(data) {
  return request({
    url: '/api/brp/brpGoodsInStock/getStockList/page',
    method: 'get',
    params: data
  });
}
