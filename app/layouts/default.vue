<template>
  <ToastContainer />

  <ConfirmContainer />

  <SignIn
    v-model:visible="showSignIn"
    class="z-90"
  />

  <div class="relative">
    <NavBar />

    <slot />
  </div>
</template>

<script setup>
const showSignIn = useState("showSignIn", () => false)
</script>

<style scoped></style>
