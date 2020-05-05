<template>
  <div>
    <!-- <pre>
      {{ dcloudSession }}
    </pre> -->

    <div v-if="loading.user.provision">
      <div class="tile is-ancestor">
        <div class="tile is-parent is-12">
          <article class="tile is-child box">
            <h1 class="title">Loading...</h1>
          </article>
        </div>
      </div>
    </div>

    <div class="tile is-ancestor" v-if="!loading.user.provision && !isProvisioned && !hasRequestedProvision">
      <!-- user not provisioned - show provision button -->
      <div class="tile is-parent is-12">
        <article class="tile is-child box">
          <h1 class="title">Start</h1>
          <b-field>
            <p>
              Your account is not provisioned for this demo yet. Would you like
              to provision it now?
            </p>
          </b-field>
          <b-field>
            <button class="button is-success" @click.prevent="clickProvision" :disabled="working.user.provision">
              {{ working.user.provision ? 'Working...' : 'Yes, Provision Me' }}
            </button>
          </b-field>
        </article>
      </div>
    </div>

    <div class="tile is-ancestor" v-if="!loading.user.provision && hasRequestedProvision">
      <!-- user not provisioned - show provision button -->
      <div class="tile is-parent is-12">
        <article class="tile is-child box">
          <h1 class="title">Provision In Progress</h1>
          <b-field>
            <p>
              Your account is currently marked for provisioning. Please allow 
              24-48 hours for your account to be ready. We will notify you via
              Webex Teams when your account is ready, and this page will
              change to show your account details.
            </p>
          </b-field>
          <!-- <b-field>
            <button class="button is-success" @click.prevent="clickProvision" :disabled="working.user.provision">
              {{ working.user.provision ? 'Working...' : 'Yes, Provision Me' }}
            </button>
          </b-field> -->
        </article>
      </div>
    </div>
    
    <!-- Demo Website config -->
    <div class="tile is-ancestor" v-if="!loading.user.provision && isProvisioned">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child box">

          <!-- Brand -->
          <b-collapse class="content card">
            <div slot="trigger" slot-scope="props" class="card-header">
              <p class="card-header-title">Demo Website</p>
              <a class="card-header-icon">
                <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
              </a>
            </div>
            <div class="card-content" v-if="loading.dcloud.vertical">
              <b-loading :is-full-page="false" :active="loading.dcloud.vertical" :can-cancel="false"></b-loading>
            </div>
            <div class="card-content" v-else>
              <div class="select">
                <select class="input" v-model="model.vertical" @change="verticalChanged">
                  <option value="" disabled selected>
                    {{ loading.dcloud.vertical ? 'Loading...' : 'Choose Your Demo Vertical' }}
                  </option>
                  <option v-for="(brand, index) in systemBrands" :value="brand.id" :key="brand.id">
                    {{ `${brand.name} (${brand.id})` }}
                  </option>
                  <option disabled>-----------------------------------------</option>
                  <option v-for="(brand, index) in userBrands" :value="brand.id" :key="brand.id">
                    {{ `${brand.name} (${brand.id})` }}
                  </option>
                  <option v-for="(brand, index) in myBrands" :value="brand.id" :key="brand.id">
                    {{ `${brand.name} (${brand.id})` }}
                  </option>
                  <option v-for="(brand, index) in filteredSortedBrands" :value="brand.id" :key="brand.id">
                    {{ `${brand.name} (${brand.id})` }}
                  </option>
                </select>
              </div>
              &nbsp;
              <button class="button is-success" @click="clickGo">Go to Demo Website</button>
              &nbsp;
              <span style="font-size: 1.3em;">Or for quick access, call {{ demoNumber }}</span>
              <b-field style="margin-top: 6px;">
                <b-checkbox v-model="showMore">Show More</b-checkbox>
              </b-field>
              <b-field v-show="showMore">
                <div class="field">
                  <div class="field">
                    <b-radio v-model="brandFilter"
                    v-if="user.admin"
                    native-value="all">Show all verticals</b-radio>
                  </div>
                  <div class="field">
                    <b-radio v-model="brandFilter"
                    native-value="mine">Show my verticals</b-radio>
                  </div>
                  <div class="field">
                    <b-radio v-model="brandFilter"
                    native-value="other">
                    <span style="float: left;">Show this user's verticals:</span>
                    <b-autocomplete
                      v-model="ownerFilter"
                      :data="autocompleteOwners">
                      <template slot="empty">No results found</template>
                    </b-autocomplete>
                  </b-radio>
                  </div>
                </div>
              </b-field>
                <p>
                  Note: You can create and configure your own vertical on the
                <a href="/branding" target="brand-toolbox">
                  <strong>Demo Branding Toolbox</strong>
                </a>.
              </p>
              <!-- Save Button -->
              <!-- <b-field>
                <button type="button" class="button is-success"
                @click.prevent="clickSave" :disabled="disableSave">Save</button>
              </b-field> -->
              <!-- /Save Button -->

            </div>
          </b-collapse>
          <!-- /Brand -->

          <!-- Advanced -->
          <b-collapse class="content card" :open="false" v-if="user.admin">
            <div slot="trigger" slot-scope="props" class="card-header">
              <p class="card-header-title">Admin Configuration</p>
              <a class="card-header-icon">
                <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
              </a>
            </div>
            <div class="card-content" v-if="loading.dcloud.vertical">
              <b-loading :is-full-page="false" :active="loading.dcloud.vertical" :can-cancel="false"></b-loading>
            </div>
            <div class="card-content" v-else>
              <b-field label="Vertical ID">
                <b-input v-model="model.vertical"></b-input>
              </b-field>
              <b-field label="Voice Queue ID">
                <b-input v-model="model.queueId"></b-input>
              </b-field>
              <b-field label="Chat Template ID">
                <b-input v-model="model.templateId"
                :placeholder="defaults.chat.templateId"></b-input>
              </b-field>
              <b-field label="Org ID">
                <b-input v-model="model.orgId"
                :placeholder="defaults.chat.orgId"></b-input>
              </b-field>
              <b-field label="DC">
                <b-input v-model="model.DC"
                :placeholder="defaults.chat.DC"></b-input>
              </b-field>
              <b-field label="Cisco App ID">
                <b-input v-model="model.CiscoAppId"
                :placeholder="defaults.chat.CiscoAppId"></b-input>
              </b-field>
              <b-field label="App Prefix">
                <b-input v-model="model.appPrefix"
                :placeholder="defaults.appPrefix"></b-input>
              </b-field>
              <b-field label="Async">
                <b-switch v-model="model.async"></b-switch>
              </b-field>
              <!-- Save Button -->
              <b-field>
                <button type="button" class="button is-success"
                @click.prevent="clickSave" :disabled="disableSave">Save</button>
              </b-field>
              <!-- /Save Button -->
            </div>
          </b-collapse>
          <!-- /Advanced -->

        </article>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      showModal: false,
      model: {},
      ownerFilter: '',
      brandFilter: 'mine',
      chatReason: '',
      showMore: false
    }
  },

  methods: {
    ...mapActions([
      'saveDemoConfig',
      'loadVerticals',
      'loadUser',
      'loadReasons',
      'provisionUser'
    ]),
    clickProvision () {
      this.provisionUser()
    },
    async confirmSaveDemoConfig ({data}) {
      console.log('confirmSaveDemoConfig', data)
      await this.saveDemoConfig({data})
      await this.loadUser(false)
    },
    async clickSave () {
      try {
        // copy model to a local var
        const data = JSON.parse(JSON.stringify(this.model))
        // remove empty strings from the data, so that those values are not unset on server side
        for (const key of Object.keys(data)) {
          if (data[key] === '') {
            delete data[key]
          }
        }
        // confirm with user and save the data to the server
        this.confirmSaveDemoConfig({data})
      } catch (e) {
        // failed to save data
        console.log('failed to save demo configuration ', e.message)
        this.$toast.open({
          message: 'Failed to save demo configuration.',
          type: 'is-danger'
        })
      }
    },
    updateCache (data) {
      console.log('home.vue updateCache:', data)
      // copy state data to local data
      try {
        this.model = JSON.parse(JSON.stringify(data))
      } catch (e) {
        console.error('failed to updateCache on home.vue - incoming data was', data, e)
      }
    },
    verticalChanged (e) {
      console.log('vertical changed to', e.target.value)
      // save
      this.clickSave()
    },
    clickGo (e) {
      console.log('clicked go button')
      window.open(this.brandDemoLink, 'brand')
    }
  },

  computed: {
    ...mapGetters([
      'loading',
      'working',
      'defaults',
      'user',
      'verticals',
      'demoConfig',
      'brandDemoLink',
      'cumulusDemoLink',
      'demoConfigId',
      'dcloudSession',
      'isProvisioned',
      'hasRequestedProvision',
      'provision'
    ]),
    demoNumber () {
      try {
        switch (this.model.vertical) {
          case 'city':
          case 'city-no-bot':
            return this.dcloudSession.dids.DID5
          case 'healthcare':
          case 'healthcare-no-bot':
            return this.dcloudSession.dids.DID9
          case 'utility':
          case 'utility-no-bot':
            return this.dcloudSession.dids.DID10
          case 'finance':
          case 'finance-no-bot':
            return this.dcloudSession.dids.DID7
          case 'travel':
          case 'travel-no-bot':
            return this.dcloudSession.dids.DID8
          default: return this.dcloudSession.dids.DID7
        }
      } catch (e) {
        return ''
      }
    },
    disableSave () {
      return false
    },
    autocompleteOwners () {
      const allOwners = this.verticals.map(v => v.owner)
      const uniqueOwners = Array.from(new Set(allOwners))
      return uniqueOwners.filter((option) => {
        return option
        .toString()
        .toLowerCase()
        .indexOf(this.ownerFilter.toLowerCase()) >= 0
      })
    },
    sortedBrands () {
      // make a mutable copy of the store data
      try {
        const copy = JSON.parse(JSON.stringify(this.verticals))
        // case-insensitive sort by name
        copy.sort((a, b) => {
          var nameA = a.name.toUpperCase() // ignore upper and lowercase
          var nameB = b.name.toUpperCase() // ignore upper and lowercase
          if (nameA < nameB) {
            return -1
          }
          if (nameA > nameB) {
            return 1
          }
          // names must be equal
          return 0
        })
        return copy
      } catch (e) {
        console.log(`couldn't get sorted brands`, e)
      }
    },
    systemBrands () {
      return this.sortedBrands.filter(v => !v.owner || v.owner === 'system' || v.owner === null)
    },
    userBrands () {
      if (this.brandFilter === 'all') {
        return this.sortedBrands.filter(v => v.owner && v.owner !== 'system' && v.owner !== null)
      } else {
        return []
      }
    },
    myBrands () {
      if (this.brandFilter === 'mine') {
        return this.sortedBrands.filter(v => v.owner === this.user.username)
      } else {
        return []
      }
    },
    filteredSortedBrands () {
      if (this.brandFilter === 'other') {
        // filter to only show the brands owned by specified user
        return this.sortedBrands.filter(v => v.owner === this.ownerFilter)
      } else {
        return []
      }
    },
    vertical () {
      return this.model.vertical
    }
  },

  async mounted () {
    try {
      // load verticals list
      await this.loadVerticals(false)
    } catch (e) {
      console.error('failed to load verticals in home.vue mounted() :', e)
    }
    // update cache
    try {
      this.updateCache(this.user.demo[this.demoConfigId])
    } catch (e) {
      // just continue
    }
  },

  watch: {
    user (val, oldVal) {
      // user object changed
      // update our cached data
      this.updateCache(val.demo[this.demoConfigId])
    },
    vertical (val) {
      const selectedVertical = this.sortedBrands.find(v => {
        return v.id === val
      })
      // is this selected vertical owned by someone else?
      if (selectedVertical && selectedVertical.owner !== 'system' &&
      selectedVertical.owner !== this.user.username) {
        // selected vertical owned by a user that is not this user
        this.brandFilter = 'other'
        this.ownerFilter = selectedVertical.owner
      }
    }
  }
}
</script>
