import request from 'utils/request';
/**
 * 获取资料文档
 * */
export function getDataUpload(params) {
  return request({
    url: '/api/bpma/bpmaDataUpload/page',
    method: 'get',
    params
  });
}
/**
 * 获取外借文档page
 */
export function getProDocumentPage(query) {
  return request({
    url: '/api/bpma/bpmaDataBorrowOutMaster/page',
    method: 'get',
    params: query
  });
}
/**
 *
 * 获取企业档案
 */
export function getDocumentPage(obj) {
  return request({
    url: '/api/brp/brpDocumentArchives/page',
    method: 'get',
    params: obj
  });
}
/**
 * 获取企业外借文档
 * checkRegistration
 */
export function getCheckRegistration(obj) {
  return request({
    url: '/api/brp/brpDocumentBorrowRegisteredMaster/page',
    method: 'get',
    params: obj
  });
}
/**
 * 获取企业文档
 * @param {*} obj
 */
export function getFilesPage(obj) {
  return request({
    url: '/api/brp/brpDocumentArchives/page',
    method: 'get',
    params: obj
  });
}
