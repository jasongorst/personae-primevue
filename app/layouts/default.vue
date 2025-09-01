<template>
  <ToastContainer />

  <ConfirmContainer />

  <SignIn
    class="z-90"
    v-model:visible="showSignIn"
  />

  <div class="relative w-full xl:max-w-screen-xl xl:mx-auto">
    <NavBar />

<!--    <SpinnerModal :visible="!isLoaded" />-->

<!--    <div :class="!isLoaded && 'hidden'">-->
    <div>
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
