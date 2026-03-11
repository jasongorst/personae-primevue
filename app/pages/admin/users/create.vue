<template>
  <UserEditor
    action="create"
    :initialValue="emptyUser"
  />
</template>

<script setup>
definePageMeta({
  name: "admin:userCreate",
  middleware: ["signed-in", "admin"]
})

const emptyUser = _mapValues(userAttributes, "initialValue")
</script>

<style scoped></style>
