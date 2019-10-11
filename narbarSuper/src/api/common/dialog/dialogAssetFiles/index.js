import request from '@/utilsCom/request';

/**
 *获取资产档案列表      /brpPropertyArchives/page
 * @param obj
 */
export function getAssetFilesData(search) {
  return request({
    url: '/api/brp/brpPropertyArchives/page',
    method: 'get',
    params: search
  });
}
/**
 *获取资产档案项目归还     //brpPropertyProUseReturnMaster/getPropertyByPage
 * @param obj
 */

export function getAssetFilesProData(search) {
  return request({
    url: '/api/brp/brpPropertyProUseReturnMaster/getPropertyByPage',
    method: 'get',
    params: search
  });
}

/**
 *获取资产档案领用归还     /brpPropertyUseReturnMaster/getPropertyByPage
 *
 * @param obj
 */
export function getAssetFilesAssetData(search) {
  return request({
    url: '/api/brp/brpPropertyUseReturnMaster/getPropertyByPage',
    method: 'get',
    params: search
  });
}

/**
 *获取资产档案报废
 *
 * @param obj
 */
export function getAssetRetirementtData(search) {
  return request({
    url: '/api/brp/brpPropertyArchives/getNoScrapPage',
    method: 'get',
    params: search
  });
}
