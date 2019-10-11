import request from 'utils/request';

export function getMaterial(params) {
  return request({
    url: '/api/smartpm/sysMaterialType/listTree',
    method: 'get',
    params: params
  });
}

export function getDiction(params) {
  return request({
    url: '/api/smartpm/sysMaterialDictionary/page',
    method: 'get',
    params: params
  });
}

export function addDictionary(data) {
  return request({
    url: '/api/smartpm/sysMaterialDictionary/addEntityList',
    method: 'post',
    data: data
  });
}

export function auditDic(data) {
  return request({
    url: '/api/smartpm/sysMaterialDictionary/audit',
    method: 'put',
    data: data
  });
}

export function deleteDic(id) {
  return request({
    url: '/api/smartpm/sysMaterialDictionary/' + id,
    method: 'delete'
  });
}

export function enableDic(data) {
  return request({
    url: '/api/smartpm/sysMaterialDictionary/enable',
    method: 'put',
    data: data
  });
}

export function getUnit() {
  return request({
    url: '/api/smartpm/sysConfigUnits/all',
    method: 'get'
  });
}
