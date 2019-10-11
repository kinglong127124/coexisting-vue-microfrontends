import request from '@/utilsCom/request';

export function getUnitTypeTreeData() {
  return request({
    url: '/api/smartpm/sysEnterpriseType/sysEnterpriseTypeTree',
    method: 'get',
    params: { type: '' }// 查询所有数据，空就是已审核
  });
}
