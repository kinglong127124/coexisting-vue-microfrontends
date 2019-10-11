import request from 'utils/request';

export function getUnitInfoList(params) {
  return request({
    url: '/api/admin/sysEnterpriseInfo/page',
    method: 'get',
    params
  });
}
