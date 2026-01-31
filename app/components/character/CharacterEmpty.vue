<template>
  <div class="text-center text-2xl">
    <template v-if="hasGlobalFilter">
      <template v-if="hasAnyAttributeFilters">
        No characters matching
        <!--suppress JSUnresolvedReference -->
        <span class="italic">&ldquo;{{ filters.global.value }}&rdquo;</span>
        with the current filters.
      </template>

      <template v-else>
        No characters matching
        <!--suppress JSUnresolvedReference -->
        <span class="italic">&ldquo;{{ filters.global.value }}&rdquo;</span>.
      </template>
    </template>

    <template v-else>No characters match the current filters.</template>
  </div>
</template>

<script setup>
const charactersStore = useCharactersStore()
const { filters, hasGlobalFilter, hasAnyAttributeFilters } = storeToRefs(charactersStore)
</script>

<style scoped></style>
