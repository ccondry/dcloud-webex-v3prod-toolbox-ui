import Vue from 'vue'
import Vuex from 'vuex'
import pkg from 'package'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
import modules from './modules'

const endpoints = {
  user: '/api/v1/cwcc-tsa/user'
}

if (process.env.NODE_ENV === 'production') {
  // set up production login/logout endpoints
  endpoints.login = '/api/v1/auth/login'
  endpoints.logout = '/api/v1/auth/logout'
  endpoints.user = '/api/v1/auth/user'
  endpoints.userDemo = '/api/v1/auth/user/demo'
} else {
  // set up development login/logout endpoints
  endpoints.login = 'http://localhost:3032/api/v1/auth/login'
  endpoints.logout = 'http://localhost:3032/api/v1/auth/logout'
  endpoints.user = 'http://localhost:3032/api/v1/auth/user'
  endpoints.userDemo = 'http://localhost:3032/api/v1/auth/user/demo'
}

endpoints.vertical = 'https://mm.cxdemo.net/api/v1/verticals?all=true&summary=true'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  actions,
  getters,
  modules,
  state: {
    demoConfigId: 'cwcc-tsa',
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
    }
  },
  mutations
})

export default store
