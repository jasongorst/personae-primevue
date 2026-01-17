<template>
  <CharacterEditor
    action="edit"
    :characterId="characterId"
  />
</template>

<script setup>
definePageMeta({
  name: "characterEdit",
  path: "/edit/:characterId(\\d+)",
  middleware: "signed-in"
})

const characterId = _toInteger(useRoute().params?.characterId)
</script>

<style scoped></style>
