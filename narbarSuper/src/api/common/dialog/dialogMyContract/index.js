import request from 'utils/request';

export function getRegistrationList(params) {
  return request({
    url: `/api/bpma/bpmaContractInfoMaster/getContractInfoMasters/${params.proId}`,
    method: 'get',
    params
  });
}
