<template>
  <Button variant="outlined">
    <Icon
      name="ph:funnel-simple-bold"
      size="1.25rem"
    />

    <div class="flex flex-col">
      <div
        class="overflow-hidden"
        :class="showFilters && 'h-0!'"
      >
        Show
      </div>

      <div
        class="overflow-hidden"
        :class="!showFilters && 'h-0!'"
      >
        Hide
      </div>
    </div>
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

<style scoped></style>
