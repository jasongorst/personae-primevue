<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const { isLoading } = storeToRefs(useCharactersStore())

// onMounted(async () => {
//   if (import.meta.dev) {
//     await useAutoSignIn()
//   }
// })

onUnmounted(() => useRemoveAllListeners())
</script>

<style scoped></style>
