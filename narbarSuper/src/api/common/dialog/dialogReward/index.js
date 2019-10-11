import request from 'utils/request';

export function getValueAwardMaster(params) {
  return request({
    url: `/api/bpma/bpmaValueAwardMaster/getValueAwardMasters/${params.proId}`,
    method: 'get',
    params
  });
}
