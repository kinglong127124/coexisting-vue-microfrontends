import request from '@/utilsCom/request';

/**
 *获取资料类别主列表
 * @param obj
 */

export function getDataTempleteMaster(params) {
  return request({
    url: `/api/bpma/bpmaDataTempleteMaster/page`,
    method: 'get',
    params
  });
}
