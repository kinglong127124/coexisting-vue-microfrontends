import request from 'utils/request';

export function getValuePunishMaster(params) {
  return request({
    url: `/api/bpma/bpmaValuePunishMaster/getValueAwardMasters/${params.proId}`,
    method: 'get',
    params
  });
}
