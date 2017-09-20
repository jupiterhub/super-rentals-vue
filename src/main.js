// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import './stylus/main.styl'
import App from './App'
import * as firebase from 'firebase' // import all exports from 'firebase' in a single file. Alternatively you can use named { initializeApp } for example
import router from './router' // webpack, default looks at index.js file
import { store } from './store'
import DateFilter from './filters/date'
import AlertComponent from './components/shared/Alert.vue'
import EditUnitDetailsDialog from './components/Rental/Edit/EditUnitDetailsDialog.vue'
import EditViewingDateDialog from './components/Rental/Edit/EditViewingDateDialog.vue'
import EditViewingTimeDialog from './components/Rental/Edit/EditViewingTimeDialog.vue'
import RequestViewingDialog from './components/Rental/Request/RequestViewingDialog.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertComponent)
Vue.component('app-edit-unit-details-dialog', EditUnitDetailsDialog)
Vue.component('app-edit-viewing-date-dialog', EditViewingDateDialog)
Vue.component('app-edit-viewing-time-dialog', EditViewingTimeDialog)
Vue.component('app-request-viewing-dialog', RequestViewingDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  store,
  components: { App },
  created () {  // built-in hook called when Vue is finished initializing
    firebase.initializeApp({
      // taken from the firebase console
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.DATABASE_URL,
      projectId: process.env.PROEJCT_ID,
      storageBucket: process.env.STORAGE_BUCKET
    })

    firebase.auth().onAuthStateChanged((user) => {
      // detects if you are alreadey signed-in via localStorage
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
        this.$store.dispatch('loadUnits')
      }
    })
  }
})
