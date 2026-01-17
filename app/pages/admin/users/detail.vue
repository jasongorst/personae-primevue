<template>
  <!--suppress JSValidateTypes -->
  <UserEditor
    action="edit"
    :userId="userId"
  />
</template>

<script setup>
definePageMeta({
  name: "admin:userDetail",
  path: "/admin/users/:userId([a-zA-Z0-9]{32})",
  middleware: ["signed-in", "admin"]
})

const userId = useRoute().params?.userId
</script>

<style scoped></style>
