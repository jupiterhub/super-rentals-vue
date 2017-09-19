<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn accent slot="activator">
      Edit Date
    </v-btn>

    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Viewing Date</v-card-title>
          </v-flex>
        </v-layout>

        <v-divider></v-divider>

        <v-layout row wrap>
          <v-flex xs12>
            <v-date-picker v-model="editableDate"
              style="width: 100%"
              actions>
              <template scope="{save, cancel}">
                <v-btn class="primary--text"
                  flat
                  @click.native="editDialog = false">Close</v-btn>
                <v-btn class="primary--text"
                  flat
                  @click.native="onSaveChanges">Save</v-btn>
              </template>
            </v-date-picker>
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
      editableDate: null
    }
  },
  methods: {
    onSaveChanges () {
      const newDate = new Date(this.unit.viewingDate)
      const newDay = new Date(this.editableDate).getUTCDate()
      const newMonth = new Date(this.editableDate).getUTCMonth()
      const newYear = new Date(this.editableDate).getUTCFullYear()

      newDate.setUTCDate(newDay)
      newDate.setUTCMonth(newMonth)
      newDate.setUTCFullYear(newYear)

      this.$store.dispatch('updateUnitData', {
        id: this.unit.id,
        viewingDate: newDate
      })
    }
  },
  created () {  // Vue built-in hook
    this.editableDate = new Date(this.unit.viewingDate)  // why not directly set on props?
  }
}
</script>
