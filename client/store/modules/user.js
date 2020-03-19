import * as types from '../mutation-types'

const state = {
  user: {}
}

const getters = {
  user: state => state.user
}

const mutations = {
  [types.SET_USER] (state, data, rootState) {
    // console.log('rootState:', this.state)
    const demoId = this.state.demoConfigId
    // make sure objects exist in user data
    data.demo = data.demo || {}
    data.demo[demoId] = data.demo[demoId] || {}

    // set default values, if not set
    if (typeof data.demo[demoId].async !== 'boolean') {
      data.demo[demoId].async = true
    }
    data.demo[demoId].CiscoAppId = data.demo[demoId].CiscoAppId || 'cisco-chat-bubble-app'
    data.demo[demoId].DC = data.demo[demoId].DC || 'appstaging.ciscoccservice.com'
    data.demo[demoId].appPrefix = data.demo[demoId].appPrefix || 'bts'
    data.demo[demoId].orgId = data.demo[demoId].orgId || '83f66514-200c-47cd-8310-4a5711e7b356'
    data.demo[demoId].templateId = data.demo[demoId].templateId || 'ce28a900-a8bc-11e9-9dce-53872d5a6b64'

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
