import request from '@/utilsCom/request';

/**
 *获取资证档案列表
 * @param obj
 */
export function getQualificationInfoData(search) {
  return request({
    url: '/api/brp/brpQualificationInfo/page',
    method: 'get',
    params: search
  });
}
