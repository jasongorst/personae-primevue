<template>
  <div class="flex flex-row flex-wrap gap-1">
    <template v-if="hasGlobalFilter">
      <Chip
        :label="`&ldquo;${filters.global.value}&rdquo;`"
        removable
        pt:root="bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-0!"
        :ptOptions="{ mergeProps: ptViewMerge }"
      >
        <template #removeicon>
          <Icon
            name="ph:x-bold"
            class="p-0.5 rounded-full hover:bg-primary-200 dark:hover:bg-primary-600"
            size="1.25em"
            @click="resetGlobalFilter"
          />
        </template>
      </Chip>
    </template>

    <template
      v-if="hasAnyAttributeFilters"
      v-for="attribute in categoryAttributes"
      :key="attribute"
    >
      <Chip
        v-if="hasFilterFor(attribute)"
        v-for="value in filters[attribute].value"
        :label="value"
        removable
        pt:root="bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-0!"
        :ptOptions="{ mergeProps: ptViewMerge }"
      >
        <template #removeicon>
          <Icon
            name="ph:x-bold"
            class="p-0.5 rounded-full hover:bg-primary-200 dark:hover:bg-primary-600"
            size="1.25em"
            @click="removeFilter(attribute, value)"
          />
        </template>
      </Chip>
    </template>
  </div>
</template>

<script setup>
const charactersStore = useCharactersStore()
const { filters, hasAnyAttributeFilters, hasGlobalFilter } = storeToRefs(charactersStore)
const { hasFilterFor, removeFilter, resetGlobalFilter } = charactersStore
</script>

<style scoped>

</style>
