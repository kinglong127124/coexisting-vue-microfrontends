import request from 'utils/request';

export function getMaterialTypeData() {
  return request({
    url: '/api/smartpm/sysMaterialType/listTree',
    method: 'get'
  });
}

export function validateStatusMaterialType(data) {
  return request({
    url: '/api/smartpm/sysMaterialType/auditTree',
    method: 'put',
    data: data
  });
}

export function deleteMaterialType(data) {
  return request({
    url: '/api/smartpm/sysMaterialType/' + data.id,
    method: 'delete'
  });
}

export function enableMaterialType(data) {
  return request({
    url: '/api/smartpm/sysMaterialType/enable/tree',
    method: 'put',
    data: data
  });
}

export function addOrUpdateMaterialType(data) {
  return request({
    url: '/api/smartpm/sysMaterialType/addOrUpdateMaterialTypes',
    method: 'post',
    data: data
  });
}

export function addMaterialType(data) {
  return request({
    url: '/api/smartpm/sysMaterialType',
    method: 'post',
    data: data
  });
}

export function updateMaterialType(data) {
  return request({
    url: '/api/smartpm/sysMaterialType/' + data.id,
    method: 'put',
    data: data
  });
}

