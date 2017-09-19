import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedUnits: [
        { imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_%285%29.jpg', id: 'grand-old-mansion', name: 'Grand Old Mansion', bedrooms: 15, viewingDate: new Date(), city: 'San Francisco', description: 'This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests.' },
        { imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg', id: 'urban-living', name: 'Urban Living', bedrooms: 1, viewingDate: new Date(), city: 'Seattle', description: 'A commuters dream. This rental is within walking distance of 2 bus stops and the Metro.' },
        { imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg', id: 'downtown-charm', name: 'Downtown Charm', bedrooms: 3, viewingDate: new Date(), city: 'Portland', description: 'Convenience is at your doorstep with this charming downtown rental. Great restaurants and active night life are within a few feet.' }
    ],
    user: null,  // do not start with any user on application
    loading: false,
    error: null
  },
  mutations: {
    createUnit (state, payload) {
      state.loadedUnits.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    },
    setLoadedUnits (state, payload) {
      state.loadedUnits = payload
    }
  },
  actions: {
    loadUnits ({commit}) {
      commit('setLoading', true)
      // you can use 'once' (http, one time) instead of 'on' (websockets, requires 2 args)
      firebase.database().ref('units').once('value')  // 'value' is a reserved keyword from firebase
        .then((data, val) => {
          const units = []
          const obj = data.val()  // obj has 2 props, key and value
          for (let key in obj) {
            units.push({
              id: key,
              name: obj[key].name,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              city: obj[key].city,
              viewingDate: obj[key].viewingDate,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedUnits', units)
          commit('setLoading', false)
        })
        .catch((error, hall) => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    // state.commit (the curly braces is a function to say i only want this method)
    createUnit ({commit, getters}, payload) {
      const unit = {
        name: payload.name,
        description: payload.description,
        city: payload.city,
        viewingDate: payload.viewingDate.toISOString(),  // Firebase cannot store d date object, only a string
        creatorId: getters.user.id
      }

      let imageUrl
      let key

      // Firebase
      firebase.database().ref('units').push(unit)
      .then((data) => {
        key = data.key
        // return key first to associate image with the key
        return key
      })
      .then(key => {
        const filename = payload.image.name
        const ext = filename.slice(filename.lastIndexOf('.'))

        // reach out to Firebase Storage
        // store under units/ subfolder, return promise
        return firebase.storage().ref('units/' + key + '.' + ext)
          .put(payload.image) // for storage() use .put()
      })
      .then(fileData => {
        // URL of uploaded image on the store
        // https://firebase.google.com/docs/reference/js/firebase.storage.Reference
        imageUrl = fileData.metadata.downloadURLs[0]  // only uploaded 1

        // .update() only override fields we specify
        return firebase.database().ref('units').child(key).update({imageUrl: imageUrl})
      })
      .then(() => {
        commit('createUnit', {
          ...unit,  // get all properties from unit
          imageUrl: imageUrl, // imageURL from Firebase (automatically created when we put the image)
          id: key     // then add the key
        })
      })

      .catch((error) => {
        console.log(error)
      })
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')    // clear all errors when sending request
      // Firebase API: https://firebase.google.com/docs/reference/js/firebase.auth
      // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createUserWithEmailAndPassword
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              requestedUnits: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')    // clear all errors when sending request
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              requestedUnits: [] // TODO: implement when done
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, requestedUnits: []})
    },
    logout ({commit}) {
      firebase.auth().signOut() // remove token from localStorage
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loadedUnits (state) {
      return state.loadedUnits.sort((unitA, unitB) => {
        return unitA.name > unitB.name // sort by name
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
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
