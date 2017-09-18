<template>
  <v-container>
    <v-layout row>
      <v-flex xz12 sm6 offset-sm3>
        <!-- listen to the dismissed event, defined in the component -->
        <app-alert @dismissed="onDismissed"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout>
      <!-- Display full width on smaller devices, for bigger ones only occupy 9/12 spaces -->
      <v-flex xs12 sm6 offset-sm3>
        <v-card-text>
          <v-container>
            <form @submit.prevent="onSignup">
              <v-layout row>
                <!-- take the full width, but already constrained from the parent-->
                <v-flex xs12>
                  <v-text-field
                    name="email"
                    label="Email"
                    id="email"
                    v-model="email"
                    type="email"
                    required>
                    </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    name="password"
                    label="Password"
                    id="password"
                    v-model="password"
                    type="password"
                    required>
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    name="confirmPassword"
                    label="Confirm Password"
                    id="confirmPassword"
                    v-model="confirmPassword"
                    type="password"
                    :rules="[comparePasswords]"> <!-- Rules is an array type, check out Vue documentation on text-filed -->
                    </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-btn type="submit" class="info">Sign up</v-btn>
                </v-flex>
              </v-layout>
            </form>
          </v-container>
        </v-card-text>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  computed: {
    comparePasswords () {
      return this.password !== this.confirmPassword ? 'Password do not match' : ''
    },
    user () {
      return this.$store.getters.user // refer to the user that was created
    }
  },
  watch: {
    user (value) {  // watch the user() property from computed
      if (value !== null && value !== undefined) {
        // there is a user now, sign up success. redirect
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignup () {
      // vuex
      this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
    },
    onDismissed () {
      console.log('dismissed alert')
    }
  }
}
</script>
