/* jshint esversion: 6 */
import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import errorLog from './modules/errorLog';
import permission from './modules/permission';
import settings from './modules/settings';
import tagsView from './modules/tagsView';
import common from './modules/common';
import user from './modules/user';
import layout from './modules/layout';
import sysManager from './modules/sysManager';

import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    settings,
    tagsView,
    layout,
    common,
    user,
    sysManager
  },
  getters
});

export default store;
