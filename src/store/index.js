import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let counter = 0

export const store = new Vuex.Store({
  state: {
    loadedUnits: [
        { imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_%285%29.jpg', id: 'grand-old-mansion', name: 'Grand Old Mansion', bedrooms: 15, viewingDate: '2017-09-18', city: 'San Francisco', description: 'a' },
        { imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg', id: 'urban-living', name: 'Urban Living', bedrooms: 1, viewingDate: '2017-09-20', city: 'Seattle', description: 'b' },
        { imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg', id: 'downtown-charm', name: 'Downtown Charm', bedrooms: 3, viewingDate: '2017-09-05', city: 'Portland', description: 'c' }
    ],
    user: {
      id: 'userId123',
      requestedUnits: ['grand-old-mansion']
    }
  },
  mutations: {
    createUnit (state, payload) {
      state.loadedUnits.push(payload)
    }
  },
  actions: {
    // state.commit (the curly braces is a function to say i only want this method)
    createUnit ({commit}, payload) {
      const unit = {
        id: '' + counter++,
        name: payload.name,
        description: payload.description,
        imageUrl: payload.imageUrl,
        city: payload.city,
        viewingDate: payload.viewingDate
      }
      console.log(unit)
      // TODO: Firebase
      commit('createUnit', unit)
    }
  },
  getters: {
    loadedUnits (state) {
      return state.loadedUnits.sort((unitA, unitB) => {
        return unitA.bedroom > unitB.bedroom // sort by bedroom count
      })
    },
    featuredUnits (state, getters) {
      return getters.loadedUnits.slice(0, 3)  // get the first 3
    },
    loadedUnit (state) {
      return (unitId) => {
        return state.loadedUnits.find((unit) => {
          return unit.id === unitId
        })
      }
    }
  }
})
