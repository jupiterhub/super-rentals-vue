import { store } from '../store'

// VueRouter enforces us to have these parameters
export default (to, from, next) => {
  if (store.getters.user) {
    // authenticated
    next()
  } else {
    next('/signin')
  }
}
