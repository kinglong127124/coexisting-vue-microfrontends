import request from 'utils/request';

export function getContractReviews(params) {
  return request({
    url: `/api/bpma/bpmaContractChange/getContractReviews/${params.proId}`,
    method: 'get',
    params
  });
}
