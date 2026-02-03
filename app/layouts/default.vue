<template>
  <PiniaColadaDevtools />

  <ToastContainer />

  <ConfirmContainer />

  <DynamicDialog />

  <div class="relative">
    <NavBar />

    <slot />
  </div>
</template>

<script setup>
import { PiniaColadaDevtools } from "@pinia/colada-devtools"
</script>

<style scoped></style>
