import Layout from '@/views/layout/Layout';

const custormManagerRouter = {
  path: '/custormManager',
  component: Layout,
  redirect: '/custormManager/index',
  children: [
    {
      path: 'index',
      component: () => import('@/views/custormManager/index'),
      name: 'CustormManagerIndex',
      meta: { title: '系统首页', icon: 'zip', noCache: false, affix: false }
    },
    {
      path: 'sysInfo',
      component: () => import('@/views/custormManager/sysInfo/index'), // Parent router-view
      name: 'SysInfoIndex',
      meta: { title: '系统信息' },
      children: [
        {
          path: 'custormMenuManager',
          component: () => import('@/views/custormManager/sysInfo/menu/index'),
          name: 'custormMenuManager',
          meta: { title: '菜单管理', icon: 'dashboard', noCache: false, affix: false }
        },
        {
          path: 'prodInfo',
          component: () => import('@/views/custormManager/sysInfo/prodInfo/list'),
          name: 'ProdInfoList',
          meta: { title: '产品信息', icon: 'dashboard', noCache: false, affix: false }
        },
        {
          path: 'unitInfo',
          component: () => import('@/views/custormManager/sysInfo/unitInfo/index'),
          name: 'unitInfo',
          meta: { title: '单位信息', icon: 'dashboard', noCache: false, affix: false }
        },
        {
          path: 'authInfo',
          component: () => import('@/views/custormManager/sysInfo/authInfo/index'),
          name: 'authInfo',
          meta: { title: '授权信息', icon: 'dashboard', noCache: false, affix: false }
        }
      ]
    },
    {
      path: 'sysBaseSet',
      component: () => import('@/views/custormManager/sysBaseSet/index'), // Parent router-view
      name: 'sysBaseSet',
      meta: { title: '模板数据管理' },
      children: [
        {
          path: 'dataDictionaryManager',
          component: () => import('@/views/custormManager/sysBaseSet/dataDictionaryManager/index'),
          name: 'DataDictionaryManager',
          meta: { title: '数据字典', icon: 'dashboard', noCache: false, affix: false }
        },
        {
          path: 'measureUnit',
          component: () => import('@/views/custormManager/sysBaseSet/measureUnit/index'),
          name: 'measureUnit',
          meta: { title: '计量单位', icon: 'dashboard', noCache: false, affix: false }
        },
        {
          path: 'monthYearManager',
          component: () => import('@/views/custormManager/sysBaseSet/monthYearManager/index'),
          name: 'monthYearManager',
          meta: { title: '会计期间', icon: 'dashboard', noCache: false, affix: false }
        },
        {
          path: 'materialType',
          component: () => import('@/views/custormManager/sysBaseSet/materialType/index'),
          name: 'MaterialType',
          meta: { title: '物资类型', icon: 'dashboard', noCache: false, affix: false }
        },
        {
          path: 'materialDictionary',
          component: () => import('@/views/custormManager/sysBaseSet/materialDictionary/index'),
          name: 'MaterialDictionary',
          meta: { title: '物资字典', icon: 'dashboard', noCache: false, affix: false }
        },
        {
          path: 'sysUnitTypeInfo',
          component: () => import('@/views/custormManager/sysBaseSet/sysUnitTypeInfo/index'),
          name: 'SysUnitTypeInfo',
          meta: { title: '单位类型', icon: 'dashboard', noCache: false, affix: false }
        }
      ]
    }
  ]
};

export default custormManagerRouter;
