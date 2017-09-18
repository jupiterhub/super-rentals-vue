<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4 class="primary--text">Add a property</h4>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <form @submit.prevent="onCreateUnit">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="name"
                label="Property Name"
                id="name"
                required
                v-model="name">
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="city"
                label="City"
                id="city"
                required
                v-model="city">
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="imageUrl"
                label="Image URL"
                id="image-url"
                required
                v-model="imageUrl">
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" height="200">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                multi-line
                required
                v-model="description">
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="primary"
              :disabled="!formIsValid"
              type="submit">Add Property</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
export default {
  data () {
    return {
      city: '',
      name: '',
      description: '',
      imageUrl: ''
    }
  },
  computed: {
    formIsValid () {
      return this.city !== '' &&
        this.name !== '' &&
          this.description !== '' &&
          this.imageUrl !== ''
    }
  },
  methods: {
    onCreateUnit () {
      if (!this.formIsValid) {
        return // do not proceed, in case the user enables the button
      }

      const unitData = {
        name: this.name,
        description: this.description,
        imageUrl: this.imageUrl,
        city: this.city,
        viewingDate: new Date()
      }

      this.$store.dispatch('createUnit', unitData)
      this.$router.push('/rentals') // redirect to Rentals
    }
  }
}
</script>
