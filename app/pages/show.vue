<template>
  <CharacterEditor
    action="view"
    :characterId="characterId"
  />
</template>

<script setup>
definePageMeta({
  name: "characterView",
  path: "/show/:characterId(\\d+)"
})

const characterId = _toInteger(useRoute().params?.characterId)
</script>

<style scoped></style>
