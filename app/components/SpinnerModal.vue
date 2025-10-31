<template>
  <Dialog
    :visible="visible"
    :closeOnEscape="false"
    modal
    :showHeader="false"
    :pt="{
      root: 'border-0 bg-transparent! shadow-none',
      content: 'p-0!',
      mask: mask
    }"
  >
    <ProgressSpinner
      class="p-progressspinner"
      :unstyled="false"
    />
  </Dialog>
</template>

<script setup>
import passthrough from "../primevue/passthrough.js"

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },

  maskClass: {
    type: String,
    required: false
  }
})

const mask = computed(() => twMerge([passthrough.dialog.mask, props.maskClass]))
</script>

<style scoped>
.p-progressspinner {
  --p-progressspinner-color-one: var(--color-primary-400);
  --p-progressspinner-color-two: var(--color-primary-900);
  --p-progressspinner-color-three: var(--color-primary-400);
  --p-progressspinner-color-four: var(--color-primary-100);
}
</style>
