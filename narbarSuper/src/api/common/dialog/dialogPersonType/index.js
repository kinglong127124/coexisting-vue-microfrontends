import request from '@/utilsCom/request';

export function getPersonTypeTreeData(params) {
  return request({
    url: '/api/smartpm/sysPersonType/listTree',
    method: 'get',
    params: params
  });
}
