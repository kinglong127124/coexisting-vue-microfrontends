import request from '@/utilsCom/request';

/**
 * 根据(附件表)的项目id查询列表  api/upload/sysAttacheFile/table
 * @param id
 */
// export function getPage(params) {
//   return request({
//     url: `/api/upload/sysAttacheFile/page`,
//     method: 'get',
//     params
//   });
// }
/**
 * 根据tableId获取文档上传的附件
 */
export function getPage(params) {
  return request({
    url: `api/upload/sysAttacheFile/table/${params.tableId}`,
    method: 'get',
    params
  });
}
