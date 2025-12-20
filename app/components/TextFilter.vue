<template>
  <InputText
    v-model="model"
    fluid
    type="search"
    placeholder="Filter&hellip;"
    @input="filterCallback"
  />
</template>

<script setup>
const model = defineModel()

const props = defineProps({
  filterCallback: {
    type: Function,
    required: true
  }
})
</script>

<style scoped></style>
