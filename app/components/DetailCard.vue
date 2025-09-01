<template>
  <Card class="max-w-prose mx-auto">
    <template #content>
      <div class="flex flex-col gap-2">
        <div
          class="flex flex-col"
          v-for="{ attribute, type } in apiAttributes"
          :key="attribute"
        >
          <label
            :for="attribute"
            class="ml-1 text-primary dark:text-primary text-sm"
          >
            {{ _startCase(attribute) }}
          </label>

          <slot
            name="attribute"
            :attribute="attribute"
            :type="type"
          />
        </div>
      </div>
    </template>

    <template #footer>
      <div class="mt-4 flex flex-row gap-3 justify-end">
        <slot name="buttons" />
      </div>
    </template>
  </Card>
</template>

<script setup>

</script>

<style scoped>

</style>
