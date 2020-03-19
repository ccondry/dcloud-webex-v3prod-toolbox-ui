<template>
  <div>

    <!-- Demo Website config -->
    <div class="tile is-ancestor">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child box">

          <!-- <h1 class="title">
            Demo Website
          </h1> -->

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
                  <option value="" disabled selected>{{ loading.dcloud.vertical ? 'Loading...' : 'Choose Your Demo Vertical' }}</option>
                  <option v-for="brand in systemBrands" :value="brand.id">{{ `${brand.name} (${brand.id})` }}</option>
                  <option disabled>-----------------------------------------</option>
                  <option v-for="brand in userBrands" :value="brand.id" v-if="brandFilter === 'all'">{{ `${brand.name} (${brand.id})` }}</option>
                  <option v-for="brand in myBrands" :value="brand.id" v-if="brandFilter === 'mine'">{{ `${brand.name} (${brand.id})` }}</option>
                  <option v-for="brand in filteredSortedBrands" :value="brand.id" v-if="brandFilter === 'other'">{{ `${brand.name} (${brand.id})` }}</option>
                </select>
              </div>
              &nbsp;
              <button class="button is-success" @click="clickGo">Go to Demo Website</button>
              &nbsp;
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

          <!-- Phone -->
          <b-collapse class="content card">
            <div slot="trigger" slot-scope="props" class="card-header">
              <p class="card-header-title">Phone Number</p>
              <a class="card-header-icon">
                <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
              </a>
            </div>
            <div class="card-content" v-if="loading.app.user">
              <b-loading :is-full-page="false" :active="loading.app.user" :can-cancel="false"></b-loading>
            </div>
            <div class="card-content" v-else>
              <p>
                This is the phone number that will be displayed in the Brand
                and Cumulus websites.
              </p>
              <b-field label="Demo Phone Number"
              message="Include + and country code, with numbers only (no spaces, dashes, etc.)">
                <b-input v-model="model.phone" placeholder="+15551112222" />
              </b-field>
              <!-- Save Button -->
              <b-field>
                <button type="button" class="button is-success"
                @click.prevent="clickSave" :disabled="disableSave">Save</button>
              </b-field>
              <!-- /Save Button -->
            </div>
          </b-collapse>
          <!-- /Phone -->

          <!-- Advanced -->
          <b-collapse class="content card" :open="false">
            <div slot="trigger" slot-scope="props" class="card-header">
              <p class="card-header-title">Advanced Configuration</p>
              <a class="card-header-icon">
                <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
              </a>
            </div>
            <div class="card-content" v-if="loading.dcloud.vertical">
              <b-loading :is-full-page="false" :active="loading.dcloud.vertical" :can-cancel="false"></b-loading>
            </div>
            <div class="card-content" v-else>
              <p>
                Cisco Webex Contact Center chat is connected using the Org ID and Template ID,
                which can be found in the code snipped generated from Webex
                control hub.
              </p>
              <b-field label="Async">
                <b-switch v-model="model.async"></b-switch>
              </b-field>
              <b-field label="Cisco App ID">
                <b-input v-model="model.CiscoAppId"
                placeholder="cisco-chat-bubble-app"></b-input>
              </b-field>
              <b-field label="DC">
                <b-input v-model="model.DC"
                placeholder="appstaging.ciscoccservice.com"></b-input>
              </b-field>
              <b-field label="App Prefix">
                <b-input v-model="model.appPrefix"
                placeholder="bts"></b-input>
              </b-field>
              <b-field label="Org ID">
                <b-input v-model="model.orgId"
                placeholder="83f66514-200c-47cd-8310-4a5711e7b356"></b-input>
              </b-field>
              <b-field label="Template ID">
                <b-input v-model="model.templateId"
                placeholder="ce28a900-a8bc-11e9-9dce-53872d5a6b64"></b-input>
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
      'loadReasons'
    ]),
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
      'user',
      'verticals',
      'demoConfig',
      'brandDemoLink',
      'cumulusDemoLink',
      'demoConfigId'
    ]),
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
      return this.sortedBrands.filter(v => v.owner && v.owner !== 'system' && v.owner !== null)
    },
    myBrands () {
      return this.sortedBrands.filter(v => v.owner === this.user.username)
    },
    filteredSortedBrands () {
      // filter to only show the brands owned by specified user
      return this.sortedBrands.filter(v => v.owner === this.ownerFilter)
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
