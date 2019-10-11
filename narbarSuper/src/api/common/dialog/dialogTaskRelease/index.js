import request from 'utils/request';

export function getTaskSend(params) {
  return request({
    url: `/api/eoa/eoaTaskSend/page`,
    method: 'get',
    params
  });
}
