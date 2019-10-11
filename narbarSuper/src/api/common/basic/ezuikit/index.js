import request from '@/utilsCom/request';

/**
 * 开始云台控制
 * @param obj
 */
export function devicePtzStart(obj) {
  return request({
    url: '/api/lapp/device/ptz/start',
    method: 'post',
    params: obj
  });
}
/**
 * 停止云台控制
 * @param obj
 */
export function devicePtzStop(obj) {
  return request({
    url: '/api/lapp/device/ptz/stop',
    method: 'post',
    params: obj
  });
}
