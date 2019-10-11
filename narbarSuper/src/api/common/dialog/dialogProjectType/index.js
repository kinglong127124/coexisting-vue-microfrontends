import request from '@/utilsCom/request';

export function getProjectTypeTreeData(params) {
  return request({
    url: '/api/admin/sysProType/listTree',
    method: 'get',
    params: params
  });
}
