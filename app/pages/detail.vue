<template>
  <CharacterEditor
    action="edit"
    :id="id"
  />
</template>

<script setup>
definePageMeta({
  name: "detail",
  path: "/:id(\\d+)"
})

const id = _toInteger(useRoute().params?.id)
</script>

<style scoped></style>
