<template>
  <ToastContainer />

  <ConfirmContainer />

  <SignIn
    v-model:visible="showSignIn"
    class="z-90"
  />

  <div class="relative w-full">
    <NavBar />

    <SpinnerModal :visible="!isLoaded" />

    <div :class="!isLoaded && 'hidden'">
      <slot />
    </div>
  </div>
</template>

<script setup>
const showSignIn = useState("showSignIn", () => false)

const charactersStore = useCharactersStore()
const { isLoaded } = storeToRefs(charactersStore)
</script>

<style scoped>

</style>
