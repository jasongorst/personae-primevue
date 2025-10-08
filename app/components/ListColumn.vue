<template>
  <Column
    :field="attribute"
    :header="_upperCase(attribute)"
    :showFilterMenu="false"
    :sortable="true"
  >
    <template #filter="{ filterModel, filterCallback }">
      <OptionsFilter
        v-if="categoryAttributes.includes(attribute)"
        v-model="filterModel.value"
        :options="options[attribute]"
        :filteredOptions="filteredOptions[attribute]"
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

const charactersStore = useCharactersStore()
const { hasFilterFor, resetFilterFor } = charactersStore
</script>

<style scoped>

</style>
