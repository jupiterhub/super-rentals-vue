<template>
  <v-dialog persistent v-model="requestViewingDialog">
    <!-- don't put too much logic in template, do in computed property -->
    <v-btn accent slot="activator" class="primary">
      {{userHasRequestedViewing ? 'Cancel Viewing' : 'Request Viewing'}}
    </v-btn>

    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title v-if="userHasRequestedViewing">Cancel Viewing?</v-card-title>
            <v-card-title v-else>Request Viewing?</v-card-title>
          </v-flex>
        </v-layout>

        <v-divider></v-divider>

        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              This will always notify the owner
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn
                flat
                class="warning--text"
                @click="requestViewingDialog = false">Cancel</v-btn>
              <v-btn
                flat
                class="primary--text"
                @click="onAgree">Confirm</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['unitId'],
  data () {
    return {
      requestViewingDialog: false
    }
  },
  computed: {
    userHasRequestedViewing () {
      // the function is executed on every single record
      this.$store.getters.user.requestedUnits.findIndex(unitId => {
        return unitId === this.unitId
      }) >= 0 // - if it doesn't find record
    }
  },
  methods: {
    onAgree () {

    }
  }
}
</script>
