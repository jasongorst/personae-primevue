<template>
  <div
    class="
      text-base flex items-stretch flex-auto group
      rounded-md border border-surface-300 dark:border-surface-700
      has-hover:border-surface-400 dark:has-hover:border-surface-600
      has-focus:border-primary
      has-p-invalid:border-danger-300 dark:has-p-invalid:border-danger-700
      has-hover:has-p-invalid:border-danger-400
      dark:has-hover:has-p-invalid:border-danger-600
      has-focus:has-p-invalid:border-danger
    "
  >
    <div
      class="
        inline-flex items-center justify-center overflow-hidden relative
        cursor-pointer select-none
        px-3 py-2 gap-2 rounded-s-md
        bg-surface-0 text-primary-300 group-has-hover:text-primary-400
        dark:bg-surface-950 dark:text-primary-700 dark:group-has-hover:text-primary-600
        group-has-focus:text-primary!
      "
    >
      <Icon name="ph:magnifying-glass-bold" />
    </div>

    <input
      v-model="model"
      v-bind="$attrs"
      class="
        appearance-none outline-hidden
        bg-surface-0 dark:bg-surface-950
        text-surface-700 dark:text-surface-0
        placeholder:text-surface-500 dark:placeholder:text-surface-400
        disabled:bg-surface-200 disabled:text-surface-500
        dark:disabled:bg-surface-700 dark:disabled:text-surface-400
        transition-colors duration-200 shadow-[0_1px_2px_0_rgba(18,18,23,0.05)]
        w-full rounded-s-none rounded-e-md
        ps-0.5 pe-3 py-2
      "
    />
  </div>
</template>

<script setup>
defineOptions({
  inheritAttrs: false
})

const model = defineModel()
</script>

<style scoped>

</style>
