<template>
  <v-alert error dismissible @input="onClose" :value="true">
    This aler is closable
  </v-alert>
</template>

<script>
export default {
  methods: {
    onClose () {
      this.$emit('dismissed') // emit am event called dismissed (to be handled on parent)
    }
  }
}
</script>
