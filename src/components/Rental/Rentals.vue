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

    <v-layout row wrap v-for="unit in units2"
      class="mb-2"
      :key="unit.id"
      v-if="!loading">
      <v-flex xs12>
        <v-card class="info white--text">
          <!-- make another container so image only takes 5 columns -->
          <v-container>
            <v-layout>
            <v-flex xs5 sm4 md3>
              <v-card-media :src="unit.imageUrl"
               height="150px">
              </v-card-media>
            </v-flex>
            <v-flex xs7 sm8 md9>
              <v-card-title primary-title>
                <div>
                  <h5 class="mb-0">{{unit.name}}</h5>
                  <div>{{unit.city}}</div>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn flat dark :to="'/rentals/' + unit.id">
                  <v-icon left dark>arrow_forward</v-icon>
                   Check details
                </v-btn>
              </v-card-actions>
            </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      units2 () {
        return this.$store.getters.loadedUnits
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>
