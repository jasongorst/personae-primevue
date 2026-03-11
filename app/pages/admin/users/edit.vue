<template>
  <div>
    <SpinnerModal
      v-if="isLoading"
      :visible="true"
    />

    <UserEditor
      v-else
      action="update"
      :userId="userId"
      :initialValue="user"
    />
  </div>
</template>

<script setup>
definePageMeta({
  name: "admin:userEdit",
  path: "/admin/users/:userId([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})",
  middleware: ["signed-in", "admin"]
})

const userId = useRoute().params?.userId
const { data: usersList, isLoading } = await useQuery(userListQuery)
const user = _find(usersList.value, { id: userId })
</script>

<style scoped></style>
