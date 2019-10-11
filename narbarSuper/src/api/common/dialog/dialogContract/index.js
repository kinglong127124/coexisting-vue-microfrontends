import request from 'utils/request';

export function getContractData(params) {
  return request({
    url: '/api/bpma/bpmaPayContractInfoMaster/page',
    method: 'get',
    params
  });
}
export function getPurchaseContractData(params) {
  return request({
    url: '/api/brp/brpResourceContractInfo/page',
    method: 'get',
    params
  });
}

/**
 * 业主管理 合同登记 合同信息列表
 * */
export function getAllContractRegistration(params) {
  return request({
    url: '/api/opma/opmaContractInfo/page',
    method: 'get',
    params
  });
}
