<template>
  <Button variant="outlined">
    <Icon
      v-if="showFilters"
      name="ph:eye-slash-bold"
      size="1.25rem"
    />

    <Icon
      v-else
      name="ph:eye-bold"
      size="1.25rem"
    />

    Filter
  </Button>
</template>

<script setup>
const props = defineProps({
  showFilters: {
    type: Boolean,
    required: true
  }
})
</script>

<style scoped>

</style>
