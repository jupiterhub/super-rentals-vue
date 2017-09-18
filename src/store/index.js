import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedUnits: [
        { link: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_%285%29.jpg', id: 'grand-old-mansion', title: 'Grand Old Mansion', bedrooms: 15, rentAvailability: '2017-09-18' },
        { link: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg', id: 'urban-living', title: 'Urban Living', bedrooms: 1, rentAvailability: '2017-09-20' },
        { link: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg', id: 'downtown-charm', title: 'Downtown Charm', bedrooms: 3, rentAvailability: '2017-09-05' }
    ],
    user: {
      id: 'userId123',
      requestedUnits: ['grand-old-mansion']
    }
  },
  mutations: {},
  actions: {},
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
