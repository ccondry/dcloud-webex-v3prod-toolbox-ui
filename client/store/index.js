import Vue from 'vue'
import Vuex from 'vuex'
import pkg from 'package'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import modules from './modules'
// website default values
import defaults from '../defaults'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  actions,
  getters,
  modules,
  state: {
    demoConfigId: 'webex-v3prod',
    pkg,
    working: {
      app: {},
      admin: {},
      user: {},
      session: {},
      dcloud: {}
    },
    loading: {
      app: {},
      admin: {},
      user: {},
      session: {},
      dcloud: {}
    },
    // website default values
    defaults
  },
  mutations
})

export default store
