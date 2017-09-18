<template>
  <v-container>
    <v-layout row wrap v-for="unit in units" class="mb-2" :key="unit.id">
      <v-flex xs12>
        <v-card class="info white--text">
          <!-- make another container so image only takes 5 columns -->
          <v-container>
            <v-layout>
            <v-flex xs5 sm4 md3>
              <v-card-media :src="unit.link"
               height="200px">
              </v-card-media>
            </v-flex>
            <v-flex xs7 sm8 md9>
              <v-card-title primary-title>
                <div>
                  <h5 class="mb-0">{{unit.title}}</h5>
                  <div>Property Description</div>
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
      units () {
        return this.$store.state.loadedUnits
      }
    }
  }
</script>
