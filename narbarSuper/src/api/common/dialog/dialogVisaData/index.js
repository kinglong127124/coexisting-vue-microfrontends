import request from 'utils/request';

export function getValueVisaMaster(params) {
  return request({
    url: `/api/bpma/bpmaValueVisaMaster/getValueVisaMasters/${params.proId}`,
    method: 'get',
    params
  });
}
