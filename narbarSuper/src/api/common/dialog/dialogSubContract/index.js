import request from 'utils/request';

export function getAllSubContractRegistration(params) {
  console.log(params);
  return request({
    url: '/api/bpma/bpmaPayContractInfoMaster/page',
    method: 'get',
    params
  });
}
