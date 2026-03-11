<template>
  <CharacterEditor
    action="create"
    :initialValue="emptyCharacter"
  />
</template>

<script setup>
definePageMeta({
  name: "characterCreate",
  middleware: "signed-in"
})
</script>

<style scoped></style>
