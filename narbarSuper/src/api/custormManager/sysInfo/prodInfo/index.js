import request from '@/utilsCom/request';
/* 产品信息*/
/**
 * 范例
 * @param obj
 * @returns {Promise<Response>}
 */
export function addProdInfo(obj) {
  return request({
    url: '/api/smartpm/user',
    method: 'post',
    data: obj
  });
}
/* 获取产品列表*/
export function getGoodslist(params) {
  return request({
    url: '/api/smartpm/sysCrmProductInfo/page',
    method: 'get',
    params: params
  });
}
/* 获取产品列表详情*/
export function getGoods(productId) {
  return request({
    url: '/api/smartpm/sysCrmProductInfo/fun/tree',
    method: 'get',
    params: {
      productId
    }
  });
}
