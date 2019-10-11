import request from 'utils/request';

export function getValueClaimEvidenceMasters(params) {
  return request({
    url: `/api/bpma/bpmaValueClaimEvidenceMaster/getValueClaimEvidenceMasters/${params.proId}`,
    method: 'get',
    params
  });
}

