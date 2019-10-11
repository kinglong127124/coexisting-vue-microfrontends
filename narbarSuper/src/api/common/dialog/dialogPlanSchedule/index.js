import request from 'utils/request';

export function getSchedulePlanMaster(id) {
  return request({
    url: `/api/bpma/bpmaSchedulePlanMaster/proId/${id}`,
    method: 'get',
    params: {
      proId: id
    }
  });
}
