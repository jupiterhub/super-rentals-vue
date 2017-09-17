<template>
  <v-app>
    <v-navigation-drawer v-model="sideNav">
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon left>camera_roll</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>About</v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon left>chat_bubble</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Contact Us</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar dark class="red darken-4">
      <v-toolbar-side-icon @click.native.stop="sideNav = !sideNav"></v-toolbar-side-icon>
      <v-toolbar-title>SuperRentals</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- only display responsively for bigger devices, check out classes at Vue documentation -->
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat>
          <v-icon left>camera_roll</v-icon>
          About
        </v-btn>
        <v-btn flat>
          <v-icon left>chat_bubble</v-icon>
          Contact Us
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false
      }
    }
  }
</script>
