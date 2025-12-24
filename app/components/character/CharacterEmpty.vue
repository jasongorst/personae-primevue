<template>
  <div class="text-center text-2xl">
    <template v-if="hasGlobalFilter">
      <template v-if="hasAnyAttributeFilters">
        No characters matching
        <span class="italic">&ldquo;{{ globalFilterValue }}&rdquo;</span>
        with the current filters.
      </template>

      <template v-else>
        No characters matching
        <span class="italic">&ldquo;{{ globalFilterValue }}&rdquo;</span>.
      </template>
    </template>

    <template v-else>No characters match the current filters.</template>
  </div>
</template>

<script setup>
const props = defineProps({
  filters: {
    type: Object,
    required: true
  }
})

// noinspection JSUnresolvedReference
const globalFilterValue = computed(() => props.filters.global.value)
const hasGlobalFilter = computed(() => isPresent(globalFilterValue.value))

const hasAnyAttributeFilters = computed(() =>
  _some(listAttributes, (attribute) => hasFilterFor(attribute))
)

function hasFilterFor(attribute) {
  return isPresent(props.filters[attribute].value)
}
</script>

<style scoped></style>
