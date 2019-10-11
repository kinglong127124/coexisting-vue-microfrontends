import request from '@/utilsCom/request';

/**
 * 获取奖励记录单
 * @param {*} obj
 */
export function getAwardPage(obj) {
  return request({
    url: '/api/opma/opmaValueAwardRecord/page',
    method: 'get',
    params: obj
  });
}

/** *
 * 获取索赔记录单
 */
export function getPunishPage(obj) {
  return request({
    url: '/api/opma/opmaValuePunishRecord/page',
    method: 'get',
    params: obj
  });
}

/** *
 * 获取扣罚记录单
 */
export function getClaimsPage(obj) {
  return request({
    url: '/api/opma/opmaValueClaimRecord/page',
    method: 'get',
    params: obj
  });
}

/** *
 * 获取工程签证单
 */
export function getProjectPage(obj) {
  return request({
    url: '/api/opma/opmaValueEngineerVisa/page',
    method: 'get',
    params: obj
  });
}
/** *
*   获取施工计量单
*/
export function getValuePage(obj) {
  return request({
    url: '/api/opma/opmaValueMeterageMaster/page',
    method: 'get',
    params: obj
  });
}
