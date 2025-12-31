<template>
  <CharacterEditor
    action="view"
    :id="id"
  />
</template>

<script setup>
definePageMeta({
  name: "characterView",
  path: "/show/:id(\\d+)"
})

const id = _toInteger(useRoute().params?.id)
</script>

<style scoped></style>
