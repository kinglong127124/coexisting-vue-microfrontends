import request from '@/utilsCom/request';

export function forgetPasswordObj(data) {
  return request({
    url: '/api/admin/user/front/forget/password',
    method: 'put',
    data
  });
}
