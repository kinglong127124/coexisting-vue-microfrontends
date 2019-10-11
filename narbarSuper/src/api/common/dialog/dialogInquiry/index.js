import request from 'utils/request';

export function getMaterialInquiryMaster(params) {
  return request({
    url: `/api/bpma/bpmaMaterialInquiryMaster/getMaterialApplyMasters/${params.proId}`,
    method: 'get',
    params
  });
}
