<template>
  <div class="flex items-stretch w-full">
    <span
      v-if="$slots.start"
      class="flex items-center justify-center min-w-10 border-y border-s border-surface-300 dark:border-surface-700 bg-surface-0 dark:bg-surface-950 text-surface-400 rounded-s-md"
    >
      <slot name="start" />
    </span>

    <slot />

    <span
      v-if="$slots.end"
      class="flex items-center justify-center min-w-10 border-y border-e border-surface-300 dark:border-surface-700 bg-surface-0 dark:bg-surface-950 text-surface-400 rounded-e-md"
    >
      <slot name="end" />
    </span>
  </div>
</template>

<script setup>

</script>

<style scoped>

</style>