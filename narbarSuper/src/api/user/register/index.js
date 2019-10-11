import request from '@/utilsCom/request';

export function registerMsg(data) {
  return request({
    url: '/api/admin/user/front/register',
    method: 'post',
    data
  });
}

export function sendCode(data) {
  return request({
    url: '/api/admin/user/getVerifyCode',
    method: 'post',
    data
  });
}

export function checkCode(data) {
  return request({
    url: '/api/admin/user/check/' + data.mobilePhone + '/' + data.verifyCode,
    method: 'post'
  });
}
