<template>
  <v-alert error dismissible @input="onClose" :value="true">
    {{ text }}
  </v-alert>
</template>

<script>
export default {
  props: ['text'],  // expecting :text
  methods: {
    onClose () {
      this.$emit('dismissed') // emit am event called dismissed (to be handled on parent)
    }
  }
}
</script>
