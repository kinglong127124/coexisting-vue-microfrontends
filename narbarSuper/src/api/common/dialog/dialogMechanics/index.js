import request from '@/utilsCom/request';

export function getMechanicsData(data) {
  return request({
    url: '/api/bpma/bpmaMachineSiteMaster/getPageList/page',
    method: 'get',
    params: data
  });
}
export function getMechanicsSettleAccountsData(data) {
  return request({
    url: '/api/bpma/bpmaMachineMeterageMaster/getList/page',
    method: 'get',
    params: data
  });
}
export function getMechanicsSettleCostMaster(data) {
  return request({
    url: '/api/bpma/bpmaMachineCostMaster/getList/page',
    method: 'get',
    params: data
  });
}

// /bpmaMachineMeterageMaster/getList/page
// /bpmaMachineCostMaster/getList/page
