import request from '@/utilsCom/request';
/**
 * 获取预算末级的数据
 * @param {*} params
 */

export function getPage(params) {
  return request({
    url: 'api/opma/opmaValueConstructionBudgetMaster/getMasterAndDetail/page',
    method: 'get',
    params
  });
}
