import request from 'utils/request';
// 获取全部地理区域列表
export function getArea(obj) {
  return request({
    url: '/api/admin/sysConfigArea/page',
    method: 'get',
    params: obj
  });
}

