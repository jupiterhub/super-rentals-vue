<template>
  <!-- persistent = it can be dismissed -->
  <v-dialog width="350px" persistent>
    <!-- component slots, cehck out https://alligator.io/vuejs/component-slots/ -->
    <v-btn fab accent slot="activator">
        <v-icon>edit</v-icon>
    </v-btn>
  </v-dialog>
</template>
