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

Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertComponent)

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
      apiKey: 'AIzaSyC2x5EuG2LgdolBWlloT-sYJyf_T2TGHnk',
      authDomain: 'superrentals-1505459904619.firebaseapp.com',
      databaseURL: 'https://superrentals-1505459904619.firebaseio.com',
      projectId: 'superrentals-1505459904619',
      storageBucket: ''
    })
  }
})
