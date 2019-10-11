// 暴露接口
import {
  getDistrictPage
} from '@/api/custormManager/sysBaseSet/districtManager';

const state = {};
const getters = {};
const mutations = {};
// 异步调接口方法
const actions = {
  // 获取主菜单列表
  GetDistrictPage({
    state
  }) {
    return new Promise((resolve, reject) => {
      getDistrictPage().then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
