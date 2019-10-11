import request from 'utils/request';

export function getValueVisafileMasters(params) {
  return request({
    url: `/api/bpma/bpmaValueVisafileMaster/getValueVisafileMasters/${params.proId}`,
    method: 'get',
    params
  });
}
