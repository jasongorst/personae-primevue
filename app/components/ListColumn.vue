<template>
  <Column
    :field="attribute"
    :header="_upperCase(attribute)"
    :showFilterMenu="false"
    :sortable="true"
  >
    <template #filter="{ filterModel, filterCallback }">
      <OptionsFilter
        v-if="_includes(categoryAttributes, attribute)"
        v-model="filterModel.value"
        :options="options"
        :filteredOptions="filteredOptions"
        :filterCallback="filterCallback"
        :hasFilter="() => hasFilterFor(attribute)"
        :resetFilter="() => resetFilterFor(attribute)"
      />

      <TextFilter
        v-else
        v-model="filterModel.value"
        :filterCallback="filterCallback"
      />
    </template>

    <template #sorticon="{ sorted, sortOrder }">
      <Icon
        v-if="sorted && sortOrder === 1"
        name="ph:sort-ascending-bold"
        size="1.25rem"
      />

      <Icon
        v-else-if="sorted && sortOrder === -1"
        name="ph:sort-descending-bold"
        size="1.25rem"
      />

      <Icon
        v-else
        name="ph:arrows-down-up-bold"
        size="1.25rem"
      />
    </template>
  </Column>
</template>

<script setup>
const props = defineProps({
  attribute: {
    type: String,
    required: true
  },

  options: {
    type: Array,
    required: false
  },

  filteredOptions: {
    type: Array,
    required: false
  }
})

const { hasFilterFor, resetFilterFor } = useCharactersStore()
</script>

<style scoped></style>
