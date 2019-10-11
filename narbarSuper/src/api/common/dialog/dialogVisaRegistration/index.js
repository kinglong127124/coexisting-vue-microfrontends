import request from 'utils/request';

export function getValueVisaMasters(params) {
  return request({
    url: `/api/bpma/bpmaValueVisaMaster/getValueVisaMasters/${params.proId}`,
    method: 'get',
    params
  });
}
