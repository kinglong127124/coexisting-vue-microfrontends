import request from 'utils/request';

export function getValueStagePayMaster(params) {
  return request({
    url: `/api/bpma/bpmaValueStagePayMaster/getValueStagePayMasters/${params.proId}`,
    method: 'get',
    params
  });
}
