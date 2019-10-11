import Layout from '@/views/layout/Layout';

const sysManagerRouter = {
  path: '/sysManager',
  component: Layout,
  redirect: '/sysManager/index',
  children: [
    {
      path: 'index',
      component: () => import('@/views/sysManager/index'),
      name: 'SysManagerIndex',
      meta: { title: '系统首页', icon: 'zip', noCache: false, affix: false }
    },
    {
      path: 'groupAuth',
      component: () => import('@/views/sysManager/groupAuth/index'), // Parent router-view
      name: 'GroupAuthIndex',
      meta: { title: '组织权限' },
      children: [
        {
          path: 'menuManager',
          component: () => import('@/views/sysManager/groupAuth/menu/index'),
          name: 'MenuManager',
          meta: { title: '菜单管理', icon: 'dashboard', noCache: false, affix: false }
        },
        {
          path: 'group',
          component: () => import('@/views/sysManager/groupAuth/group/index'),
          name: 'Group',
          meta: { title: '权限管理', icon: 'dashboard', noCache: false, affix: false }
        },
        {
          path: 'groupMechanism',
          component: () => import('@/views/sysManager/groupAuth/groupMechanism/index'),
          name: 'GroupMechanism',
          meta: { title: '组织机构', icon: 'dashboard', noCache: false, affix: false }
        }, {
          path: 'userManager',
          component: () => import('@/views/sysManager/groupAuth/userManager/index'),
          name: 'userManager',
          meta: { title: '操作人员', icon: 'dashboard', noCache: false, affix: false }
        }, {
          path: 'userManager/id/:id*',
          component: () => import('@/views/sysManager/groupAuth/userManager/detail'),
          name: 'userManagerDetail',
          meta: { title: '操作人员-详情', icon: 'dashboard', noCache: false, affix: false }
        },
        {
          path: 'gateLog',
          component: () => import('@/views/sysManager/groupAuth/gateLog/index'),
          name: 'ateLog',
          meta: { title: '操作日志', icon: 'dashboard', noCache: false, affix: false }
        }
      ]
    }
  ]
};

export default sysManagerRouter;
