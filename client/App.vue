<template>
  <div id="app">
    <nprogress-container></nprogress-container>
    <b-loading :is-full-page="true" :active="loading.app.endpoints" :can-cancel="false"></b-loading>
    <navbar :show="true" :menu-filter.sync="menuFilter"></navbar>
    <div v-if="authenticated && endpoints">
      <sidebar :show="sidebar.opened && !sidebar.hidden" :menu-filter="menuFilter"></sidebar>
      <app-main></app-main>
    </div>
    <!-- <footer-bar></footer-bar> -->
  </div>
</template>

<script>
import NprogressContainer from 'vue-nprogress/src/NprogressContainer'
import { Navbar, Sidebar, AppMain } from 'components/layout/'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      menuFilter: ''
    }
  },

  components: {
    Navbar,
    Sidebar,
    AppMain,
    NprogressContainer
  },

  async beforeMount () {
    const { body } = document
    const WIDTH = 768
    const RATIO = 3

    const handler = () => {
      if (!document.hidden) {
        let rect = body.getBoundingClientRect()
        let isMobile = rect.width - RATIO < WIDTH
        this.toggleDevice(isMobile ? 'mobile' : 'other')
        this.toggleSidebar({
          opened: !isMobile
        })
      }
    }

    // add event listeners for DOM events
    document.addEventListener('visibilitychange', handler)
    window.addEventListener('DOMContentLoaded', handler)
    window.addEventListener('resize', handler)

    // check the JWT in localstorage to see if the user is already logged in
    // try {
    console.log('checking login...')
    await this.checkLogin()
    console.log('checking login done.')
    // console.log('getting endpoints...')
    // await this.getEndpoints()
    console.log('getting endpoints done.')
    // load current user data from database
    await this.loadUser(false)
  },

  async mounted () {
  },

  computed: {
    ...mapGetters([
      'sidebar',
      'authenticated',
      'loading',
      'endpoints'
    ])
  },

  methods: {
    ...mapActions([
      'toggleDevice',
      'toggleSidebar',
      'checkLogin',
      'getEndpoints',
      'loadUser'
    ])
  },
  watch: {
    authenticated (val, oldVal) {
      if (oldVal === true && val === false) {
        // if user goes from logged in to logged out, forward them to the login page
        window.location = '/auth/login?destination=' + window.location
      } else if (oldVal === false && val === true) {
        // user just logged in
        // load user details from database
        // this.loadUser()
      }
    }
  }
}
</script>

<style lang="scss">
html {
  background-color: whitesmoke;
}

.nprogress-container {
  position: fixed !important;
  width: 100%;
  height: 50px;
  z-index: 2048;
  pointer-events: none;

  #nprogress {
    $color: #48e79a;

    .bar {
      background: $color;
    }
    .peg {
      box-shadow: 0 0 10px $color, 0 0 5px $color;
    }

    .spinner-icon {
      border-top-color: $color;
      border-left-color: $color;
    }
  }
}

// style the b-collapse heading bar
.content .card-header .card-header-title {
  margin-bottom: 0;
}
.card-header-title, .card-header-icon {
  background-color: #f3f3f3;
}
</style>
