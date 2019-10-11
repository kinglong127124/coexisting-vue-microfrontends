import request from '@/utilsCom/request';

/**
 * 范例
 * @param obj
 * @returns {Promise<Response>}
 */
// 获取全部会计期间年份
export function getAccountancyYear(obj) {
  return request({
    url: '/api/smartpm/sysConfigAccountancyYear/page',
    method: 'get',
    params: obj
  });
}

// 批量新增及修改的会计期间年份
export function addAccountancyYear(list) {
  return request({
    url: '/api/smartpm/sysConfigAccountancyYear/addEntityList',
    method: 'post',
    data: list
  });
}

// 删除单个会计期间年份
export function deleteAccountancyYear(id) {
  return request({
    url: '/api/smartpm/sysConfigAccountancyYear/' + id,
    method: 'delete'
  });
}

// 审核单个会计期间年份
export function configAccountancyYear(row) {
  return request({
    url: '/api/smartpm/sysConfigAccountancyYear/audit',
    method: 'put',
    data: row
  });
}

// 获取全部会计期间月份
export function getAccountancyMonth(obj) {
  return request({
    url: '/api/smartpm/sysConfigAccountancyMonth/page',
    method: 'get',
    params: obj
  });
}

// 批量新增及修改的会计期间月份
export function addAccountancyMonth(list) {
  return request({
    url: '/api/smartpm/sysConfigAccountancyMonth/addEntityList',
    method: 'post',
    data: list
  });
}

// 删除单个会计期间月份
export function deleteAccountancyMonth(id) {
  return request({
    url: '/api/smartpm/sysConfigAccountancyMonth/' + id,
    method: 'delete'
  });
}

// 审核单个会计期间月份
export function configAccountancyMonth(row) {
  return request({
    url: '/api/smartpm/sysConfigAccountancyMonth/audit',
    method: 'put',
    data: row
  });
}

/**
 * 启用 禁用 月份
 * */
export function enableOrDisabledMonth(obj) {
  return request({
    url: 'api/smartpm/sysConfigAccountancyMonth/enable',
    method: 'put',
    data: obj
  });
}
/**
 * 启用 禁用 年份
 * */
export function enableOrDisabledYear(obj) {
  return request({
    url: 'api/smartpm/sysConfigAccountancyYear/enable',
    method: 'put',
    data: obj
  });
}
