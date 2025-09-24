<template>
  <!-- navbar: line-height 1.5 [1.25rem * 1.5 = 1.875rem]; py-2 [2 * --spacing(2) = --spacing(4) = 16px]; border [2 * 1px = 2px]; mb-4 [--spacing(4) = 16px] -->
  <!-- header: line-height 1.25 [1.25rem]; py-2 [2 * --spacing(2) = --spacing(4) = 16px]; border [2 * 1px = 2px]; mb-2 [
  --spacing(2) = 8px] -->
  <!-- footer: line-height 1.25 [1.25rem]; py-1 [1 * --spacing(1) = --spacing(2) = 8px; border [2 * 1px = 2px] -->

  <!-- toolbar: 48px + 16px = 64px -->
  <!-- header: 46px + 1px = 47px -->
  <!-- footer: 46px + 1px = 47px -->
  <DataTable
    :value="characters"
    v-model:filters="filters"
    :filterDisplay="showFilters ? 'row' : null"
    :globalFilterFields="globalFilterAttributes"
    removableSort
    rowHover
    scrollHeight="calc(100vh - 158px)"
    scrollable
    selectionMode="single"
    dataKey="id"
    size="small"
    stateKey="datatable-state"
    stateStorage="session"
    stripedRows
    showGridlines
    resizableColumns
    :pt="{
      header: `pb-0!`,
      thead: `bg-surface-0! dark:bg-surface-950!`,
      footer: `p-0!`,
      headerRow: `first-of-type:bg-surface-0 dark:first-of-type:bg-surface-900 last:align-top
                  first-of-type:*:border-r-2 last:*:border-r-0 nth-of-type-2:*:px-1 nth-of-type-2:*:py-2`,
      column: {
        bodyCell: `max-w-[8rem] truncate`,
        headerCell: `bg-transparent! max-w-[8rem] truncate border-r-surface-200 dark:border-r-surface-700`
      }
    }"
    @filter="(event) => updatefilteredCharacters(event.filteredValue)"
    @rowSelect="(event) => showDetail(event.data)"
  >
    <template #header>
      <div class="mb-2 flex gap-4 justify-between">
        <SearchField
          v-model="filters['global'].value"
          placeholder="Search"
          type="search"
        />

        <ClearFiltersButton
          :disabled="!hasAnyFilters"
          @click="clearFilters"
          class="px-4"
        />

        <ToggleFiltersButton
          @click="toggleShowFilters"
          class="px-4"
          :showFilters="showFilters"
        />
      </div>

      <FilterChips
        v-if="hasAnyFilters && !showFilters"
        class="mb-2"
      />
    </template>

    <template #empty>
      <div class="text-2xl text-center">
        <template v-if="hasGlobalFilter && !hasAnyAttributeFilters">
          No characters matching
          <span class="italic">&ldquo;{{ filters['global'].value }}&rdquo;</span>.
        </template>

        <template v-else-if="hasGlobalFilter && hasAnyAttributeFilters">
          No characters matching
          <span class="italic">&ldquo;{{ filters['global'].value }}&rdquo;</span>
          with the current filters.
        </template>

        <template v-else>
          No characters match the current filters.
        </template>
      </div>
    </template>

    <Column
      v-for="attribute in listAttributes"
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

    <template #footer>
      <ListToolbar
        :filtered-count="filteredCount"
        :count="count"
      />
    </template>
  </DataTable>
</template>

<script setup>
// onMounted(async () => await useAutoSignIn())

const charactersStore = useCharactersStore()
const { characters, count, filters, hasAnyAttributeFilters, hasAnyFilters, hasGlobalFilter, options } = storeToRefs(charactersStore)
const { hasFilterFor, resetFilterFor, resetFilters } = charactersStore

const showFilters = ref(false)
const filteredCharacters = ref(characters.value)
const filteredCount = computed(() => _size(filteredCharacters.value))

const filteredOptions = computed(() => _reduce(
  categoryAttributes,
  (acc, attribute) => _set(acc, attribute, uniqValues(filteredCharacters.value, attribute)),
  {}
))

function updatefilteredCharacters(filteredValue) {
  filteredCharacters.value = filteredValue
}

async function showDetail({ id }) {
  await navigateTo({ name: "edit-id", params: { id } })
}

function clearFilters() {
  resetFilters()
  showFilters.value = false
}

function toggleShowFilters() {
  showFilters.value = !showFilters.value
}
</script>

<style scoped>

</style>
