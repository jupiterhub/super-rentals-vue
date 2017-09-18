<template>
  <v-alert error dismissable @input="onClose">

  </v-alert>
</template>

<script>
export default {
  methods: {
    onClose () {
      this.emit('dismissed') // emit am event called dismissed (to be handled on parent)
    }
  }
}
</script>
