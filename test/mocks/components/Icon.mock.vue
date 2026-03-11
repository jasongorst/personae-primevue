<template>
  <div data-testid="icon">
    {{ name }}
  </div>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },

  size: {
    type: String,
    required: false,
    default: "1em"
  },

  mode: {
    type: String,
    required: false,
    default: "svg"
  }
})
</script>

<style scoped></style>
