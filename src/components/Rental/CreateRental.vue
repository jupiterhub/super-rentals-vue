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
              <v-btn raised
                class="primary"
                @click="onPickFile">Upload Image
              </v-btn>
              <!-- No Vuetify for File upload, create a button and trigger file upload event
                ref="" is a Vue property to refer -->
              <input type="file"
              style="display: none"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked">
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
              <h5 class="secondary--text">Viewing Availability</h5>
            </v-flex>
          </v-layout>

          <v-layout row class="mb-2">
            <v-flex xs12 sm6 offset-sm3>
              <v-date-picker v-model="date"></v-date-picker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-time-picker v-model="time" format="24hr"></v-time-picker>
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
      imageUrl: '',
      date: new Date(),
      time: new Date(),
      image: null
    }
  },
  computed: {
    formIsValid () {
      return this.city !== '' &&
        this.name !== '' &&
          this.description !== '' &&
          this.imageUrl !== ''
    },
    submittableDateTime () {
      const date = new Date(this.date)
      if (typeof this.time === 'string') {
        const hours = this.time.match(/^(\d+)/)[1]
        const minutes = this.time.match(/:(\d+)/)[1]
        date.setHours(hours)
        date.setMinutes(minutes)
      } else {
        date.setHours(this.time.getHours())
        date.setMinutes(this.time.getMinutes())
      }

      return date
    }
  },
  methods: {
    onCreateUnit () {
      if (!this.formIsValid) {
        return // do not proceed, in case the user enables the button
      }

      if (!this.image) {
        return  // do not proceed on empty image
      }

      const unitData = {
        name: this.name,
        description: this.description,
        image: this.image,  // imageUrl can be store but it is in BASE64, storing image like this is not good, because it's too long. Instead store binary
        city: this.city,
        viewingDate: this.submittableDateTime
      }

      this.$store.dispatch('createUnit', unitData)
      this.$router.push('/rentals') // redirect to Rentals
    },
    onPickFile () {
      // access all ref="" on this component
      this.$refs.fileInput.click() // execute native click
    },
    onFilePicked (event) {
      const files = event.target.files // default dom to access a list of files
      let fileName = files[0].name // .filename is native javascript

      if (fileName.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file!')
      }
      // covert image to Base64
      const fileReader = new FileReader() // JS Feature

      // listen to load event (fires when done)
      fileReader.addEventListener('load', () => {
        // <img> can read a base64 and bes way to preview
        this.imageUrl = fileReader.result
      })

      fileReader.readAsDataURL(files[0])  // async action, will trigger event
      this.image = files[0]
    }
  }
}
</script>
