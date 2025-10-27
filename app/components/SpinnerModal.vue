<template>
  <Dialog
    :visible="visible"
    :closeOnEscape="false"
    modal
    :showHeader="false"
    :pt="{
      root: 'border-0 bg-transparent!',
      content: 'p-0!'
    }"
  >
    <ProgressSpinner
      class="p-progressspinner"
      :unstyled="false"
    />
  </Dialog>
</template>

<script setup>
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.p-progressspinner {
  --p-progressspinner-color-one: var(--color-primary-400);
  --p-progressspinner-color-two: var(--color-primary-900);
  --p-progressspinner-color-three: var(--color-primary-400);
  --p-progressspinner-color-four: var(--color-primary-100);
}
</style>
