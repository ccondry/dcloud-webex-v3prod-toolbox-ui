
// determine REST URL path
let urlPrefix = ''
let authUrlPrefix = ''
if (process.env.NODE_ENV === 'production') {
  // set up production endpoints path
  urlPrefix = '/api/v1/webex-v3prod'
  authUrlPrefix = '/api/v1/auth'
} else {
  // set up development endpoints path
  urlPrefix = 'http://localhost:3065/api/v1/webex-v3prod'
  authUrlPrefix = 'http://localhost:3032/api/v1/auth'
  // use production path in development
  // urlPrefix = 'https://dcloud-collab-toolbox-rtp.cxdemo.net/api/v1'
  // authUrlPrefix = 'https://dcloud-collab-toolbox-rtp.cxdemo.net/api/v1'
}

// set up REST URL endpoints object
const state = {
  endpoints: {
    login: authUrlPrefix + '/login',
    logout: authUrlPrefix + '/logout',
    user: authUrlPrefix + '/user',
    userDemo: authUrlPrefix + '/user/demo',
    // get dCloud instances for this instant demo
    instance: authUrlPrefix + '/instance',
    // get dCloud session ID and datacenter in for the instant demo session
    session: 'https://mm.cxdemo.net/api/v1/sessions',
    vertical: 'https://mm.cxdemo.net/api/v1/verticals?all=true&summary=true',
    provision: authUrlPrefix + '/provision',
    doProvision: urlPrefix + '/provision',
    webex: authUrlPrefix + '/resource/joinWebexV3SupportRoom',
    version: urlPrefix + '/version'
  }
}

const getters = {
  endpoints: state => state.endpoints
}

export default {
  state,
  getters
}
