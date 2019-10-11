// 暴露接口
import {
  getCompanyMsg,
  changeCompanyMsg,
  authMode,
  enabledMode,
  statuMode
} from '@/api/custormManager/sysInfo/unitInfo';

const state = {};
const getters = {};
const mutations = {};
// 异步调接口方法
const actions = {
  AuthMode({
    state
  }) {
    return new Promise((resolve, reject) => {
      authMode().then(response => {
        resolve(response);
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
    });
  },
  EnabledMode({
    state
  }) {
    return new Promise((resolve, reject) => {
      enabledMode().then(response => {
        resolve(response);
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
    });
  },
  StatuMode({
    state
  }) {
    return new Promise((resolve, reject) => {
      statuMode().then(response => {
        resolve(response);
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
    });
  },
  GetCompanyMsg({
    state
  }, id) {
    return new Promise((resolve, reject) => {
      getCompanyMsg(id).then(response => {
        resolve(response);
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
    });
  },
  // 修改用户公司信息
  ChangeCompanyMsg({
    state
  }, data) {
    return new Promise((resolve, reject) => {
      changeCompanyMsg(data).then(response => {
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
