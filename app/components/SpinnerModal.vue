<template>
  <Dialog
    :visible="visible"
    modal
    :showHeader="false"
    pt:root:class="bg-transparent! border-0"
    pt:content:class="p-0!"
  >
    <ProgressSpinner :unstyled="false" />
  </Dialog>
</template>

<script setup>
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
    default: false
  }
})
</script>

<style scoped>
/*noinspection CssUnusedSymbol*/
.p-progressspinner {
  --p-progressspinner-color-one: var(--color-primary-400);
  --p-progressspinner-color-two: var(--color-primary-900);
  --p-progressspinner-color-three: var(--color-primary-400);
  --p-progressspinner-color-four: var(--color-primary-100);
}
</style>
