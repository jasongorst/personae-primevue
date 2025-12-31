<template>
  <UserEditor action="create" />
</template>

<script setup>
definePageMeta({
  name: "admin:userCreate",
  middleware: ["signed-in", "admin"]
})
</script>

<style scoped></style>
