import request from '@/utilsCom/request';

export function getStationTreeData() {
  return request({
    url: '/api/admin/sysOrgInfo/orgTree',
    method: 'get'
  });
}
