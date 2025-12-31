<template>
  <!--suppress JSValidateTypes -->
  <UserEditor
    action="edit"
    :id="id"
  />
</template>

<script setup>
definePageMeta({
  name: "admin:userDetail",
  path: "/admin/users/:id([a-zA-Z0-9]{32})",
  middleware: ["signed-in", "admin"]
})

const id = useRoute().params?.id
</script>

<style scoped></style>
