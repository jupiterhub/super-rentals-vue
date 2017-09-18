<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h6 class="primary--text">{{unit.name}}</h6>
          </v-card-title>
          <v-card-media :src="unit.imageUrl"
           height="400px">
          </v-card-media>
          <v-card-text>
            <div class="primary--text">{{unit.city}} - {{unit.viewingDate}}</div>
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
    }
  }
}
</script>
