import * as firebase from 'firebase'

export default {
  state: {
    user: null  // do not start with any user on application
  },
  mutations: {
    requestViewing (state, payload) {
      const id = payload.id

      // already requested viewing?
      if (state.user.requestedUnits.findIndex(unit => unit.id === id) >= 0) {
        return
      }

      state.user.requestedUnits.push(id)
      // this way we can lookup the id, and get the firebase Key
      state.user.fbKeys[id] = payload.fbKey
    },
    cancelViewing (state, payload) {
      const requestedUnits = state.user.requestedUnits

      // Splice removes the element given
      const unitArrayPosition = requestedUnits.findIndex(meetup => meetup.id === payload)
      requestedUnits.splice(unitArrayPosition, 1)  // remove that element

      // JS API. Remove fbKeys (firebase key)
      Reflect.deleteProperty(state.user.fbKeys, payload)  // delete only that key
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    requestViewing ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      firebase.database().ref('/users/' + user.id).child('/requestedUnits/')
        .push(payload)
        .then((data) => {
          commit('setLoading', false)
          commit('requestViewing', {id: payload, fbKey: data.key})
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    cancelViewing ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      const fbKey = user.fbKeys[payload]

      if (!user.fbKeys) {
        commit('setLoading', false)
        return
      }

      firebase.database()
          .ref('/users/' + user.id + '/requestedUnits/').child(fbKey)
          .remove()
          .then(() => {
            commit('setLoading', false)
            commit('cancelViewing', payload)
          })
          .catch(error => {
            commit('setLoading', false)
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
              requestedUnits: [],
              fbKeys: {}
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
              requestedUnits: [],
              fbKeys: {}
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
      commit('setUser', {
        id: payload.uid,
        requestedUnits: [],
        fbKeys: {}
      })
    },
    fetchUserData ({commit, getters}) {
      commit('setLoading', true)
      // once fetches data only once, 'on' will listen to changes
      firebase.database().ref('/users/' + getters.user.id + '/requestedUnits/').once('value')
        .then(data => {
          const firebaseAndUnitPairs = data.val() // returns an array of [firebaseKey: unitKey]
          let requestedUnits = []
          let swappedPairs = {}
          for (let firebaseKey in firebaseAndUnitPairs) {
            let unitId = firebaseAndUnitPairs[firebaseKey]
            requestedUnits.push(unitId)
            swappedPairs[unitId] = firebaseKey
          }
          const updatedUser = {
            id: getters.user.id,
            requestedUnits: requestedUnits,
            fbKeys: swappedPairs  // id=firebase, val=unit
          }
          commit('setLoading', false)
          commit('setUser', updatedUser)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
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
    user (state) {
      return state.user
    }
  }
}
