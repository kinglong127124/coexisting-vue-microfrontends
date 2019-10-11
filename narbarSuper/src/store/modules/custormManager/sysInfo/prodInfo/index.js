// 产品信息
import {
  getGoodslist,
  getGoods
} from '@/api/custormManager/sysInfo/prodInfo';

const state = {};
const getters = {};
const mutations = {};
// 异步调接口方法
const actions = {
  GetGoodslist({
    state
  }, params) {
    return new Promise((resolve, reject) => {
      getGoodslist(params).then(response => {
        resolve(response);
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
    });
  },
  // 获取产品信息
  GetGoods({
    state
  }, productId) {
    return new Promise((resolve, reject) => {
      getGoods(productId).then(response => {
        resolve(response);
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
