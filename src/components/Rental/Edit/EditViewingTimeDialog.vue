<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn accent slot="activator">
      Edit Time
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
            <v-time-picker v-model="editableTime"
              style="width: 100%"
              actions
              format="24hr">
              <template scope="{save, cancel}">
                <v-btn class="primary--text"
                  flat
                  @click.native="editDialog = false">Close</v-btn>
                <v-btn class="primary--text"
                  flat
                  @click.native="onSaveChanges">Save</v-btn>
              </template>
            </v-time-picker>
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
      editableTime: null
    }
  },
  methods: {
    onSaveChanges () {
      const newDate = new Date(this.unit.viewingDate)

      const hours = this.editableTime.match(/^(\d+)/)[1]
      const minutes = this.editableTime.match(/:(\d+)/)[1]

      newDate.setHours(hours)
      newDate.setMinutes(minutes)

      this.$store.dispatch('updateUnitData', {
        id: this.unit.id,
        viewingDate: newDate
      })
    }
  },
  created () {  // Vue built-in hook
    // pass time, timepicker will hnandle automatically
    this.editableTime = new Date(this.unit.viewingDate).toTimeString()  // why not directly set on props?
  }
}
</script>
