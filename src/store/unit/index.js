import * as firebase from 'firebase'

export default {
  state: {
    loadedUnits: [
        { imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_%285%29.jpg', id: 'grand-old-mansion', name: 'Grand Old Mansion', bedrooms: 15, viewingDate: new Date(), city: 'San Francisco', description: 'This grand old mansion sits on over 100 acres of rolling hills and dense redwood forests.' },
        { imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg', id: 'urban-living', name: 'Urban Living', bedrooms: 1, viewingDate: new Date(), city: 'Seattle', description: 'A commuters dream. This rental is within walking distance of 2 bus stops and the Metro.' },
        { imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg', id: 'downtown-charm', name: 'Downtown Charm', bedrooms: 3, viewingDate: new Date(), city: 'Portland', description: 'Convenience is at your doorstep with this charming downtown rental. Great restaurants and active night life are within a few feet.' }
    ]
  },
  mutations: {
    createUnit (state, payload) {
      state.loadedUnits.push(payload)
    },
    setLoadedUnits (state, payload) {
      state.loadedUnits = payload
    },
    updateUnit (state, payload) {
      // find will return a unit, and only return the id that matches
      const unit = state.loadedUnits.find(unit => {
        return unit.id === payload.id
      })

      // change only when you want to change
      if (payload.name) {
        // do not override data if empty
        unit.name = payload.name
      }
      if (payload.city) {
        // do not override data if empty
        unit.city = payload.city
      }
      if (payload.description) {
        // do not override data if empty
        unit.description = payload.description
      }
      if (payload.viewingDate) {
        // do not override data if empty
        unit.viewingDate = payload.viewingDate
      }
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
    updateUnitData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.name) {
        // do not override data if empty
        updateObj.name = payload.name
      }
      if (payload.city) {
        // do not override data if empty
        updateObj.city = payload.city
      }
      if (payload.description) {
        // do not override data if empty
        updateObj.description = payload.description
      }
      if (payload.viewingDate) {
        // do not override data if empty
        updateObj.viewingDate = payload.viewingDate
      }

      // update will only override properties that needs to be overwriten
      firebase.database().ref('units').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateUnit', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
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
    }
  }
}
