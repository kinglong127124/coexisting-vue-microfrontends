import request from 'utils/request';

export function getFeeTypeData() {
  return request({
    url: '/api/admin/sysFeeType/listTree',
    method: 'get'
  });
}
