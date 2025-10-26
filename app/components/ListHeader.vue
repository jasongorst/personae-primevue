<template>
  <div>
    <div class="flex justify-between gap-4 pb-2">
      <SearchField
        v-model="filters['global'].value"
        placeholder="Search"
        type="search"
      />

      <ClearFiltersButton
        :disabled="!hasAnyFilters"
        @click="resetFilters"
        class="px-4"
      />

      <ToggleFilterButton
        @click="emit('toggleShowFilters')"
        class="px-4"
        :showFilters="showFilters"
      />
    </div>

    <FilterChips
      v-if="hasAnyFilters && !showFilters"
      class="pb-2"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  showFilters: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(["toggleShowFilters", "updated"])
const charactersStore = useCharactersStore()
const { resetFilters } = charactersStore
const { filters, hasAnyFilters } = storeToRefs(charactersStore)

onUpdated(async () => emit("updated"))
</script>

<style scoped></style>
