import request from 'utils/request';

export function getMaterialDictionary(params) {
  return request({
    url: '/api/admin/sysMaterialDictionary/page',
    method: 'get',
    params: params
  });
}

export function getMaterial(params) {
  return request({
    url: '/api/admin/sysMaterialType/listTree',
    method: 'get',
    params: params
  });
}
