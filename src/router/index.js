import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home' // @ is an alias for the root folder (src/)
import Rentals from '@/components/Rental/Rentals'
import CreateRental from '@/components/Rental/CreateRental'
import Profile from '@/components/User/Profile'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home', // name is optional
      component: Home
    },
    {
      path: '/rentals',
      name: 'Rentals',
      component: Rentals
    },
    {
      path: '/rental/new',
      name: 'CreateRental',
      component: CreateRental
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ]
})
