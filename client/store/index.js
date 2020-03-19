import Vue from 'vue'
import Vuex from 'vuex'
import pkg from 'package'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import modules from './modules'
// website default values
import defaults from '../defaults'

// determine REST URL path
let urlPrefix = ''
if (process.env.NODE_ENV === 'production') {
  // set up production endpoints path
  urlPrefix = '/api/v1/auth/'
} else {
  // set up development endpoints path
  // urlPrefix = 'http://localhost:3032/api/v1/auth'
  // use production path in development
  urlPrefix = 'https://dcloud-collab-toolbox-rtp.cxdemo.net/api/v1/auth/'
}

// set up REST URL endpoints object
const endpoints = {
  login: urlPrefix + 'login',
  logout: urlPrefix + 'logout',
  user: urlPrefix + 'user',
  userDemo: urlPrefix + 'user/demo',
  vertical: 'https://mm.cxdemo.net/api/v1/verticals?all=true&summary=true'
}

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  actions,
  getters,
  modules,
  state: {
    demoConfigId: 'webex-v3prod',
    pkg,
    endpoints,
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
