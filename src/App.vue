<template>
  <v-app>
    <v-navigation-drawer v-model="sideNav">
      <v-list>
        <v-list-tile v-for="item in menuItems"
        :key="item.title"
        router
        :to="item.link">
          <v-list-tile-action>
            <v-icon left>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{item.title}}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar dark class="primary">
      <v-toolbar-side-icon @click.native.stop="sideNav = !sideNav"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">SuperRentals</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- only display responsively for bigger devices, check out classes at Vue documentation -->
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems"
        :key="item.title"
        router
        :to="item.link">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false,
        menuItems: [
          { icon: 'location_city', title: 'Rentals', link: '/rentals' },
          { icon: 'add_location', title: 'Add Property', link: '/rental/new' },
          { icon: 'person', title: 'Profile', link: '/profile' },
          { icon: 'face', title: 'Sign up', link: '/signup' },
          { icon: 'lock_open', title: 'Sign in', link: '/signin' }
        ]
      }
    }
  }
</script>
