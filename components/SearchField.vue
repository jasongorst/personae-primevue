<template>
  <div class="
  flex items-stretch flex-auto group rounded-md
  border border-surface-300 dark:border-surface-700
  has-enabled:has-hover:border-surface-400 dark:has-enabled:has-hover:border-surface-600
  has-enabled:has-focus:border-primary
  has-p-invalid:border-danger-300 dark:has-p-invalid:border-danger-700
  has-enabled:has-hover:has-p-invalid:border-danger-400 dark:has-enabled:has-hover:has-p-invalid:border-danger-600
  has-enabled:has-focus:has-p-invalid:border-danger
">
    <input
      v-model.lazy.trim="query"
      class="
        appearance-none rounded-md outline-hidden
        bg-surface-0 dark:bg-surface-950
        p-filled:bg-surface-50 dark:p-filled:bg-surface-800
        text-surface-700 dark:text-surface-0
        placeholder:text-surface-500 dark:placeholder:text-surface-400
        disabled:bg-surface-200 disabled:text-surface-500
        dark:disabled:bg-surface-700 dark:disabled:text-surface-400
        px-3 py-2 p-fluid:w-full
        p-small:text-sm p-small:px-[0.625rem] p-small:py-[0.375rem]
        p-large:text-lg p-large:px-[0.875rem] p-large:py-[0.625rem]
        transition-colors duration-200 shadow-[0_1px_2px_0_rgba(18,18,23,0.05)]
        grow rounded-s-md rounded-e-none
      "
      id="search"
      placeholder="Search"
      type="search"
    />

    <Button
      variant="text"
      tabindex="-1"
      pt:root="
        bg-surface-0! dark:bg-surface-950! rounded-s-none! rounded-e-md!
        enabled:hover:bg-surface-50! enabled:active:bg-surface-100!
        dark:enabled:hover:bg-surface-900! dark:enabled:active:bg-surface-800!
      "
      :ptOptions="{ mergeProps: true }"
    >
      <Icon name="ph:magnifying-glass-bold" />
    </Button>
  </div>
</template>

<script setup>
const query = useState("query")
</script>

<style scoped>

</style>
