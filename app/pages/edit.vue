<template>
  <CharacterEditor
    action="edit"
    :id="id"
  />
</template>

<script setup>
definePageMeta({
  name: "characterEdit",
  path: "/edit/:id(\\d+)",
  middleware: "signed-in"
})

const id = _toInteger(useRoute().params?.id)
</script>

<style scoped></style>
