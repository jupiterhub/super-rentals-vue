<template>
  <v-container>
    <v-layout v-if="loading">
      <v-flex xz12 class="text-xs-center mt-5">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="4"
          :size="50">
        </v-progress-circular>
      </v-flex>
    </v-layout>

    <!-- v-else because we already have if in same level of nesting -->
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <div>
              <h5 class="primary--text">{{unit.name}}</h5>
              <div class="secondary--text tmp-0">{{unit.city}}</div>
            </div>
            <!-- only show if the user is the owner of this property -->
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-unit-details-dialog
                :unit="unit"></app-edit-unit-details-dialog>
            </template>
          </v-card-title>
          <v-card-media :src="unit.imageUrl"
           height="400px">
          </v-card-media>
          <v-card-text>
            <div class="info--text">Viewing Availability: {{unit.viewingDate | date}}</div>
            <div>
              {{unit.description}}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Rent</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['id'],  // expect id parameter from URL (see router/index.js)
  computed: {
    unit () {
      // you can use this.$route to get the id or use props (like above)
      return this.$store.getters.loadedUnit(this.id)
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
    },
    userIsCreator () {
      // refers to computed property
      if (!this.userIsAuthenticated) {
        return false
      }

      // this,unit refers to computed unit()
      return this.$store.getters.user.id === this.unit.creatorId
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>
