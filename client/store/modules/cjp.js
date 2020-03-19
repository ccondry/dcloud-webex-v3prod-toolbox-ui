import * as types from '../mutation-types'

const state = {
  verticals: [],
  demoConfig: {}
}

const getters = {
  verticals: state => state.verticals,
  demoConfig: state => state.demoConfig,
  brandDemoLink (state, getters) {
    return `https://mm-brand.cxdemo.net?session=v3prod&datacenter=webex&userId=${getters.user.id}`
  },
  cumulusDemoLink (state, getters) {
    return `https://mm.cxdemo.net?session=v3prod&datacenter=webex&userId=${getters.user.id}`
  }
}

const mutations = {
  [types.SET_VERTICALS] (state, data) {
    state.verticals = data
  },
  [types.SET_DEMO_CONFIG] (state, data) {
    state.demoConfig = data
  }
}

const actions = {
  async loadVerticals ({getters, commit, dispatch}, showNotification = true) {
    dispatch('setLoading', {group: 'dcloud', type: 'vertical', value: true})
    await dispatch('loadToState', {
      name: 'verticals',
      endpoint: getters.endpoints.vertical,
      mutation: types.SET_VERTICALS,
      success: 'Verticals loaded.',
      fail: 'Failed to load verticals list',
      showNotification
    })
    dispatch('setLoading', {group: 'dcloud', type: 'vertical', value: false})
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
