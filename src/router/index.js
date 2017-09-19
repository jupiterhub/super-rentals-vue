import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home' // @ is an alias for the root folder (src/)
import Rentals from '@/components/Rental/Rentals'
import CreateRental from '@/components/Rental/CreateRental'
import Rental from '@/components/Rental/Rental'
import Profile from '@/components/User/Profile'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import AuthGuard from './auth-guard'  // same directory

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
      component: CreateRental,
      beforeEnter: AuthGuard  // protect this route
    },
    {
      path: '/rentals/:id',
      name: 'Rental',
      props: true,  // pass the parameter as a props
      component: Rental
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
  ],
  mode: 'history' // doesn't use '#' and the url looks cleaner (signup)
})
