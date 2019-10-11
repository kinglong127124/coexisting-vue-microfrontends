import request from '@/utilsCom/request';

/**
 * 用户信息列表
 * @param query
 */
export function getUserManagerData(query) {
  return request({
    url: '/api/admin/user/common/page',
    method: 'get',
    params: query
  });
}
