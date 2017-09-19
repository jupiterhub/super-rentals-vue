import Vue from 'vue'
import Vuex from 'vuex'

import unit from './unit' // automatically looks up /index.js file
import user from './user' // automatically looks up /index.js file
import shared from './shared' // automatically looks up /index.js file

Vue.use(Vuex)

// methods can be accessed from other files, because it's merged here. ie. setLoading
export const store = new Vuex.Store({
  modules: {
    unit: unit,
    user: user,
    shared: shared
  }
})
