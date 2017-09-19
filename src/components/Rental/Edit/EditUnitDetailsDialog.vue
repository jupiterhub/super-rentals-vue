<template>
  <!-- persistent = canot be dismissed by clicks -->
  <!-- v-model is automatically set to true when activator is clicked-->
  <v-dialog width="350px" persistent v-model="editDialog">
    <!-- https://vuetifyjs.com/components/dialogs -->
    <!-- Activator is reserved, check documenatation. only render contantes when clicked -->
    <v-btn fab accent slot="activator">
        <v-icon>edit</v-icon>
    </v-btn>

    <v-card>
      <v-container>
        <v-layout row wrap>
          <!-- 1 layout for all sizes -->
          <v-flex xs12>
            <v-card-title>Edit Property</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>

        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="name"
                label="Property Name"
                id="name"
                v-model="editedName"
                required>
              </v-text-field>
              <v-text-field
                name="city"
                label="City"
                id="city"
                v-model="editedCity"
                required>
              </v-text-field>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                multi-line
                v-model="editedDescription"
                required>
              </v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>

        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn flat class="primary--text"
                @click="editDialog = false">Close</v-btn>
              <v-btn flat class="primary--text"
                @click="onSaveChanges">Save</v-btn>

            </v-card-actions>
          </v-flex>
        </v-layout>

      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['unit'],
  data () {
    return {
      editDialog: false,
      editedName: this.unit.name,
      editedCity: this.unit.city,
      editedDescription: this.unit.description
    }
  },
  methods: {
    onSaveChanges () {
      // manual check becuse we're not submitting the form and vuetify doen't know
      if (this.editedName.trim() === '' ||
          this.editedCity.trim() === '' ||
          this.editedDescription.trim() === '') {
        return
      }
      this.editDialog = false
      this.$store.dispatch('updateUnitData', {
        id: this.unit.id,
        title: this.editedTitle,
        city: this.editedCity,
        description: this.editedDescription
      })
    }
  }
}
</script>
