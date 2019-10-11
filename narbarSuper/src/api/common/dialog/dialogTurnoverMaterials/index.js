import request from '@/utilsCom/request';

export function getTurnoverMaterialsData(data) {
  return request({
    url: '/api/bpma/bpmaReuseMaterialStock/getList/page',
    method: 'get',
    params: data
  });
}
export function getTurnoverMaterialsSettleAccountsData(data) {
  return request({
    url: '/api/bpma/bpmaReuseMaterialMeterageMaster/getList/page',
    method: 'get',
    params: data
  });
}
