// 暴露接口
import {
  getSysEnterpriseAllDetail,
  postSysEnterpriseAllAdd,
  putSysEnterpriseEnable,
  deleteSysEnterpriseInfoData,
  postChangeStatus,
  deleteSysEnterprisePersonData,
  postSysEnterprisePersonChangeJobState,
  postSysEnterprisePersonJobSta,
  postSysEnterprisePersonQuery,
  deleteSysEnterpriseCert,
  postSysEnterpriseCertCheckStatus,
  postSysEnterpriseCertQuery
}
  from '@/api/custormManager/unit/sysEnterpriseInfo';

const state = {};
const getters = {};
const mutations = {};
// 异步调接口方法
const actions = {
  // 获取单位信息所有数据
  GetSysEnterpriseAllDetail({
    state
  }, id) {
    return new Promise((resolve, reject) => {
      getSysEnterpriseAllDetail(id).then(response => {
        resolve(response);
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
    });
  },
  PostSysEnterpriseAllAdd({
    state
  }, obj) {
    return new Promise((resolve, reject) => {
      postSysEnterpriseAllAdd(obj).then(response => {
        resolve(response);
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
    });
  },
  PutSysEnterpriseEnable({
    state
  }, obj) {
    return new Promise((resolve, reject) => {
      putSysEnterpriseEnable(obj).then(response => {
        resolve(response);
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
    });
  },
  DeleteSysEnterpriseInfoData({
    state
  }, id) {
    return new Promise((resolve, reject) => {
      deleteSysEnterpriseInfoData(id).then(response => {
        resolve(response);
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
    });
  },
  PostChangeStatus({
    state
  }, parameters) {
    return new Promise((resolve, reject) => {
      postChangeStatus(parameters).then(response => {
        resolve(response);
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
    });
  },
  DeleteSysEnterprisePersonData({
    state
  }, id) {
    return new Promise((resolve, reject) => {
      deleteSysEnterprisePersonData(id).then(response => {
        resolve(response);
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
    });
  },
  PostSysEnterprisePersonChangeJobState({
    state
  }, parameters) {
    return new Promise((resolve, reject) => {
      postSysEnterprisePersonChangeJobState(parameters).then(response => {
        resolve(response);
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
    });
  },
  PostSysEnterprisePersonJobSta({
    state
  }, parameters) {
    return new Promise((resolve, reject) => {
      postSysEnterprisePersonJobSta(parameters).then(response => {
        resolve(response);
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
    });
  },
  PostSysEnterprisePersonQuery({
    state
  }, parameters) {
    return new Promise((resolve, reject) => {
      postSysEnterprisePersonQuery(parameters).then(response => {
        resolve(response);
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
    });
  },
  PostSysEnterpriseCertQuery({
    state
  }, parameters) {
    return new Promise((resolve, reject) => {
      postSysEnterpriseCertQuery(parameters).then(response => {
        resolve(response);
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
    });
  },
  DeleteSysEnterpriseCert({
    state
  }, id) {
    return new Promise((resolve, reject) => {
      deleteSysEnterpriseCert(id).then(response => {
        resolve(response);
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
    });
  },
  PostSysEnterpriseCertCheckStatus({
    state
  }, parameters) {
    return new Promise((resolve, reject) => {
      postSysEnterpriseCertCheckStatus(parameters).then(response => {
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
