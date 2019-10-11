import request from 'utils/request';

export function getValueClaimMaster(params) {
  return request({
    url: `/api/bpma/bpmaValueClaimMaster/getValueClaimMasters/${params.proId}`,
    method: 'get',
    params
  });
}
