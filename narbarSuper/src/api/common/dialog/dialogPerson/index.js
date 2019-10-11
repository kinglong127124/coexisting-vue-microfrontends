import request from '@/utilsCom/request';

export function getOrgTreeAll() {
  return request({
    url: '/api/admin/sysOrgInfo/orgTree',
    method: 'get'
  });
}

export function getOrgInfo(params) {
  return request({
    url: `/api/admin/sysOrgInfo/orgTree/page/${params.id}`,
    method: 'get',
    params
  });
}
