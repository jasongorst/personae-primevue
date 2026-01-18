<template>
  <!--suppress JSValidateTypes -->
  <UserEditor
    action="edit"
    :userId="userId"
  />
</template>

<script setup>
definePageMeta({
  name: "admin:userEdit",
  path: "/admin/users/:userId([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})",
  middleware: ["signed-in", "admin"]
})

const userId = useRoute().params?.userId
</script>

<style scoped></style>
