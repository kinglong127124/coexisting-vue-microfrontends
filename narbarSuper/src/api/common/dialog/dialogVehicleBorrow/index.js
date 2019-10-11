import request from 'utils/request';
export function getPage(query) {
  return request({
    url: '/api/brp/brpVehicleBorrow/page',
    method: 'get',
    params: query
  });
}
