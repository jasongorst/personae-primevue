<template>
  <CharacterEditor action="create" />
</template>

<script setup>
definePageMeta({
  name: "characterCreate",
  middleware: "signed-in"
})
</script>

<style scoped></style>
