
// determine REST URL path
let urlPrefix = ''
if (process.env.NODE_ENV === 'production') {
  // set up production endpoints path
  urlPrefix = '/api/v1'
} else {
  // set up development endpoints path
  // urlPrefix = 'http://localhost:3032/api/v1/auth'
  // use production path in development
  urlPrefix = 'https://dcloud-collab-toolbox-rtp.cxdemo.net/api/v1'
}

// set up REST URL endpoints object
const state = {
  endpoints: {
    login: urlPrefix + '/auth/login',
    logout: urlPrefix + '/auth/logout',
    user: urlPrefix + '/auth/user',
    userDemo: urlPrefix + '/auth/user/demo',
    // get dCloud instances for this instant demo
    instance: urlPrefix + '/webex-v3prod/instances',
    // get dCloud session ID and datacenter in for the instant demo session
    // session: '/api/v1/webex-v3prod/instances',
    vertical: 'https://mm.cxdemo.net/api/v1/verticals?all=true&summary=true'
  }
}

const getters = {
  endpoints: state => state.endpoints
}

export default {
  state,
  getters
}
