import request from '@/utilsCom/request';

export function getDeviceData(data) {
  return request({
    url: '/api/site/siteHikCameraInfo/getNotBindCameraInfo',
    method: 'get',
    params: data
  });
}
