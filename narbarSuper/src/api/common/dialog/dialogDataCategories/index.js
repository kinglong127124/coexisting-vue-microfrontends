import request from '@/utilsCom/request';

/**
 * 根据项目ID获取数据
 * */
export function getCategoriesTreeData(id) {
  return request({
    url: `api/bpma/bpmaDataType/proId/${id}`,
    method: 'get'
  });
}
/** *
 * 获取企业管理的文档类别
 */
export function getDocumentTem(obj) {
  return request({
    url: '/api/brp/brpDocumentType/page',
    method: 'get',
    params: obj
  });
}
