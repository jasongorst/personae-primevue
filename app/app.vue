<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
onMounted(async () => {
  if (import.meta.dev) {
    await useAutoSignIn()
  }
})

onUnmounted(() => useRemoveAllListeners())
</script>

<style scoped></style>
