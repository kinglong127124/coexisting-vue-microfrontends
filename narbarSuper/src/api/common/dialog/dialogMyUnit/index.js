import request from 'utils/request';

export function getOrgInfo(params) {
  return request({
    url: '/api/admin/sysOrgInfo/orgTree',
    method: 'get',
    params
  });
}
