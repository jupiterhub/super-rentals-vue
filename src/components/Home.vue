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

  <v-layout row wrap>
    <v-flex xs12>
      <v-carousel>
        <v-carousel-item v-for="unit in units"
        :src="unit.link"
        :key="unit.id">
        <div class="title">
          {{unit.title}}
        </div>
        </v-carousel-item>
      </v-carousel>
    </v-flex>
  </v-layout>
  </v-container>

</template>


<script>
export default {
  data () {
    return {
      units: [
        { link: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_%285%29.jpg', id: 'grand-old-mansion', title: 'Grand Old Mansion' },
        { link: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg', id: 'urban-living', title: 'Urban Living' },
        { link: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg', id: 'downtown-charm', title: 'Downtown Charm' }
      ]
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
