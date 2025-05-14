<template>
  <div
    class="w-full xl:max-w-screen-xl xl:mx-auto"
    data-testid="base-container"
  >
    <NavBar />

    <NuxtPage />
  </div>
</template>

<script setup>
const query = useState("query", () => "")
</script>

<style scoped>

</style>
