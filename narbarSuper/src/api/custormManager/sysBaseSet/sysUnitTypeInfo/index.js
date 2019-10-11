import request from 'utils/request';

export function getUnitTypeData() {
  return request({
    url: '/api/smartpm/sysEnterpriseType/sysEnterpriseTypeTree',
    method: 'get',
    params: { type: 'all' }// 查询所有数据，空就是已审核
  });
}

export function validateStatusUnitType(data) {
  return request({
    url: '/api/smartpm/sysEnterpriseType/auditTree',
    method: 'put',
    data: data
  });
}

export function enableUnitType(data) {
  return request({
    url: '/api/smartpm/sysEnterpriseType/enable/tree',
    method: 'put',
    data: data
  });
}

export function deleteUnitType(data) {
  return request({
    url: '/api/smartpm/sysEnterpriseType/' + data.id,
    method: 'delete'
  });
}

export function addOrUpdateUnitType(data) {
  return request({
    url: '/api/smartpm/sysEnterpriseType/addOrUpdateEnterpriseTypes',
    method: 'post',
    data: data
  });
}

export function updateUnitType(data) {
  return request({
    url: '/api/smartpm/sysEnterpriseType/sysEnterpriseType/update',
    method: 'post',
    data: data
  });
}

// 单位信息
export function getUnitInfoList(params) {
  return request({
    url: '/api/smartpm/sysEnterpriseInfo/page',
    method: 'get',
    params: params
  });
}

export function addUnitType(data) {
  return request({
    url: '/api/smartpm/sysEnterpriseType/sysEnterpriseType/add',
    method: 'post',
    data: data
  });
}
