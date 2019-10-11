import { registerMsg } from '@/api/user/register';

const state = {
  msg: {}
};
const getters = {};
const actions = {
  /**
   * //注册
   * @param commit
   * @param msg
   * @returns {Promise<any>}
   * @constructor
   */
  RegisterMsg({
    commit
  }, msg) {
    return new Promise((resolve, reject) => {
      commit('REGISTER_MSG', msg);
      registerMsg(msg).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    });
  }
};
const mutations = {
  REGISTER_MSG: (state, msg) => {
    state.msg = msg;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
