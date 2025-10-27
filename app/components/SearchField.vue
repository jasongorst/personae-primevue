<template>
  <div
    class="group flex flex-auto items-stretch rounded-md border border-surface-300
      text-base has-hover:border-surface-400 has-focus:border-primary
      has-p-invalid:border-danger-300 has-hover:has-p-invalid:border-danger-400
      has-focus:has-p-invalid:border-danger dark:border-surface-700
      dark:has-hover:border-surface-600 dark:has-p-invalid:border-danger-700
      dark:has-hover:has-p-invalid:border-danger-600"
  >
    <div
      class="relative inline-flex cursor-pointer items-center justify-center gap-2
        overflow-hidden rounded-s-md bg-surface-0 px-3 py-2 text-primary-300 select-none
        group-has-hover:text-primary-400 group-has-focus:text-primary!
        dark:bg-surface-950 dark:text-primary-700 dark:group-has-hover:text-primary-600"
    >
      <Icon name="ph:magnifying-glass-bold" />
    </div>

    <input
      v-model="model"
      v-bind="$attrs"
      class="w-full appearance-none rounded-s-none rounded-e-md bg-surface-0 py-2 ps-0.5 pe-3
        text-surface-700 shadow-[0_1px_2px_0_rgba(18,18,23,0.05)] outline-hidden
        transition-colors duration-200 placeholder:text-surface-500
        disabled:bg-surface-200 disabled:text-surface-500 dark:bg-surface-950
        dark:text-surface-0 dark:placeholder:text-surface-400
        dark:disabled:bg-surface-700 dark:disabled:text-surface-400"
    />
  </div>
</template>

<script setup>
defineOptions({
  inheritAttrs: false
})

const model = defineModel()
</script>

<style scoped></style>
