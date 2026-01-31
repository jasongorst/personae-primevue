<template>
  <div class="flex min-h-56.5 flex-col justify-between gap-2">
    <InputText
      v-model="model"
      fluid
      type="search"
      placeholder="Filter&hellip;"
      @input="filterCallback"
    />

    <Button
      class="py-0.5!"
      variant="outlined"
      size="small"
      fluid
      :disabled="!hasFilter()"
      @click="resetFilter"
    >
      Clear
    </Button>
  </div>
</template>

<script setup>
const model = defineModel()

const props = defineProps({
  filterCallback: {
    type: Function,
    required: true
  },

  hasFilter: {
    type: Function,
    required: true
  },

  resetFilter: {
    type: Function,
    required: true
  }
})
</script>

<style scoped></style>
