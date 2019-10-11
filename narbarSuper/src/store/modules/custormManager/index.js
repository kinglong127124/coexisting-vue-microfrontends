import prodInfo from './sysInfo/prodInfo';
import authInfo from './sysInfo/authInfo';
import unitInfo from './sysInfo/unitInfo';
import districtManager from './sysBaseSet/districtManager';
import measureUnit from './sysBaseSet/measureUnit';
import monthYearManager from './sysBaseSet/monthYearManager';
import areaManager from './sysBaseSet/areaManager';
import sysEnterpriseInfo from './sysEnterpriseInfo';
import sysDataDictionary from './sysBaseSet/dataDictionary';

const state = {};
const getters = {};
const actions = {};
const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations,
  modules: {
    prodInfo,
    authInfo,
    unitInfo,
    districtManager,
    measureUnit,
    monthYearManager,
    areaManager,
    sysEnterpriseInfo,
    sysDataDictionary
  }
};
