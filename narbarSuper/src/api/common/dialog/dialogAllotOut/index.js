import request from '@/utilsCom/request';

// 引入调拨出库单-调拨入库
export function getAllotInData(data) {
  return request({
    url: '/api/bpma/bpmaMaterialOutAllocateMaster/getOutAllocateList/page',
    method: 'get',
    params: data
  });
}

