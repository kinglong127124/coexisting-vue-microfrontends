import request from 'utils/request';
/**
 * 所有权限的项目信息
 * */
export function getProjectList(params) {
  return request({
    url: '/api/admin/sysProAuth/listOwnProByAuth',
    method: 'get',
    params
  });
}

/**
* 所有项目信息
* */
export function getAllProjectList(params) {
  return request({
    url: '/api/admin/sysProInfo/page',
    method: 'get',
    params
  });
}
