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
