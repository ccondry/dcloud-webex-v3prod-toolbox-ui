import * as types from '../mutation-types'
import defaults from '../../defaults'

const state = {
  user: {}
}

const getters = {
  user: state => state.user
}

const mutations = {
  [types.SET_USER] (state, data) {
    // console.log('rootState:', this.state)
    const demoId = this.state.demoConfigId
    // make sure parent objects exist in user data
    data.demo = data.demo || {}
    data.demo[demoId] = data.demo[demoId] || {}

    try {
      // set default values from root state, if not set in user's demo config
      if (typeof data.demo[demoId].async !== 'boolean') {
        data.demo[demoId].async = defaults.chat.async
      }
      data.demo[demoId].CiscoAppId = data.demo[demoId].CiscoAppId || defaults.chat.CiscoAppId
      data.demo[demoId].DC = data.demo[demoId].DC || defaults.chat.DC
      data.demo[demoId].appPrefix = data.demo[demoId].appPrefix || defaults.chat.appPrefix
      data.demo[demoId].orgId = data.demo[demoId].orgId || defaults.chat.orgId
      data.demo[demoId].templateId = data.demo[demoId].templateId || defaults.chat.templateId
    } catch (e) {
      console.log('failed to assign values to demo config:', e)
    }

    // save to state
    state.user = data
  }
}

const actions = {
  async loadUser ({getters, commit, dispatch}, showNotification = true) {
    try {
      dispatch('setLoading', {group: 'app', type: 'user', value: true})
      await dispatch('loadToState', {
        name: 'load user',
        endpoint: getters.endpoints.user,
        mutation: types.SET_USER,
        // success: 'User details loaded',
        fail: 'Failed to load user details',
        showNotification
      })
    } catch (e) {
      console.error('error loading defaults', e)
      dispatch('errorNotification', {title: 'Failed to load user details', error: e})
    } finally {
      dispatch('setLoading', {group: 'app', type: 'user', value: false})
    }
  },
  async saveDemoConfig ({getters, commit, dispatch}, {data, showNotification = true}) {
    try {
      dispatch('setWorking', {group: 'app', type: 'user', value: true})
      await dispatch('postData', {
        name: 'save demo configuration',
        endpoint: getters.endpoints.userDemo + '?id=' + getters.demoConfigId,
        success: 'Demo configuration saved.',
        fail: 'Failed to save your demo configuration',
        data,
        showNotification
      })
    } catch (e) {
      console.error('error loading defaults', e)
      dispatch('errorNotification', {title: 'Failed to load user details', error: e})
    } finally {
      dispatch('setWorking', {group: 'app', type: 'user', value: false})
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
