import request from 'utils/request';

/**
 * 直入直出单
 * */
export function getMaterialInInoutMaster(params) {
  return request({
    url: '/api/bpma/bpmaMaterialInInoutMaster/page',
    method: 'get',
    params
  });
}
