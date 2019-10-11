import request from '@/utilsCom/request';

/* 获取主菜单列表*/
export function getAllMenus() {
  return request({
    url: '/api/admin/menu/user/menus',
    method: 'get'
  });
}

