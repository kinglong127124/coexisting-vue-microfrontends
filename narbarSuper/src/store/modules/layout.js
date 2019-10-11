import { getAllMenus } from '@/api/layout';
import { getMenusList } from '@/utilsCom';

const layout = {
  state: {
    rootMenus: [],
    childrenMenus: [],
    productId: 0,
    rootMenusSelected: '',
    menusSearch: undefined
  },
  mutations: {
    ROOT_MENUS: (state, rootMenus) => {
      state.rootMenus = rootMenus;
    },
    CHILDREN_MENUS: (state, childrenMenus) => {
      state.childrenMenus = childrenMenus;
    },
    PRODUCT_ID: (state, productId) => {
      state.productId = productId;
    },
    ROOTMENUS_SELECTED: (state, rootMenusSelected) => {
      state.rootMenusSelected = rootMenusSelected;
    },
    MENUS_SEARCH: (state, menusSearch) => {
      state.menusSearch = menusSearch;
    }
  },
  actions: {
    // 切换子菜单
    ChildrenMenus({
      commit,
      state
    }, menu) {
      return new Promise((resolve, reject) => {
        if (menu && menu['children'].length > 0) {
          // 如果存在被选中菜单，获取左边菜单
          commit('CHILDREN_MENUS', menu['children']);
          // 如果存在被选中菜单，获取左边搜索叶子节点数据
          commit('MENUS_SEARCH', getMenusList(menu['children']));
        } else {
          commit('CHILDREN_MENUS', []);
          commit('MENUS_SEARCH', []);
        }
        resolve();
      });
    },
    // 获取产品信息
    RootMenus({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        getAllMenus().then(response => {
          const menuDataAll = response.data;
          commit('ROOT_MENUS', menuDataAll);
          // 获得被选中的值
          for (const selectedObj in menuDataAll) {
            if (menuDataAll[selectedObj].selected === 1) {
              commit('ROOTMENUS_SELECTED', menuDataAll[selectedObj]);
              // 如果存在被选中菜单，获取左边菜单
              // commit('CHILDREN_MENUS', menuDataAll[selectedObj].children);
              // 如果存在被选中菜单，获取左边搜索叶子节点数据
              // commit('MENUS_SEARCH', getMenusList(menuDataAll[selectedObj].children));
              break;
            }
          }
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    // 设置根菜单选中
    RootMenusSelected({
      commit,
      state
    }, data) {
      return new Promise(resolve => {
        if (data) {
          const menuDataAll = state.rootMenus;
          for (const selectedObj in menuDataAll) {
            if (menuDataAll[selectedObj].code == data) {
              commit('ROOTMENUS_SELECTED', menuDataAll[selectedObj]);
              break;
            }
          }
        }
      });
    }
  }
};
export default layout;
