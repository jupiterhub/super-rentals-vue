<template>
  <v-container>
    <v-layout row wrap class="mb-2">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/rentals" class="info">Explore more</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/rental/new" class="info">Add property</v-btn>
      </v-flex>
    </v-layout>

  <v-layout>
    <v-flex xz12 class="text-xs-center"
      v-if="loading">
      <v-progress-circular
        indeterminate
        class="primary--text"
        :width="4"
        :size="50">
      </v-progress-circular>
    </v-flex>
  </v-layout>
  <v-layout row wrap>
    <v-flex xs12>
      <v-carousel style="cursor: pointer" v-if="!loading">
        <v-carousel-item v-for="unit in units"
        :src="unit.imageUrl"
        :key="unit.id"
        @click="goToProperty(unit.id)">
        <div class= "title">
          {{unit.name}}
        </div>
        </v-carousel-item>
      </v-carousel>
    </v-flex>
  </v-layout>

  <v-layout row wrap class="mt-2">
    <v-flex xs12 class="text-xs-center">
      <p>Be featured in our properties</p>
    </v-flex>
  </v-layout>

  </v-container>

</template>


<script>
export default {
  computed: {
    units () {
      return this.$store.getters.featuredUnits
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    goToProperty (propertyId) {
      this.$router.push('rentals/' + propertyId)
    }
  }
}

</script>

<style scoped>
.title {
  position: absolute;
  bottom: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2em;
  padding: 20px;
}
</style>
