import request from 'utils/request';

/**
 * 直进直出单列表
 * */
export function getMaterialInInout(params) {
  return request({
    url: '/api/bpma/bpmaMaterialInInoutMaster/getList/page',
    method: 'get',
    params
  });
}
