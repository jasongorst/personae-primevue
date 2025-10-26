<template>
  <DataTable
    :value="characters"
    v-model:filters="filters"
    :filterDisplay="showFilters ? 'row' : null"
    :globalFilterFields="globalFilterAttributes"
    sortField="createdAt"
    :sortOrder="1"
    removableSort
    rowHover
    :scrollHeight="`calc(100vh - ${elementHeights})`"
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
      header: {
        class: `pb-0!`,
        id: 'datatable_header'
      },
      thead: `bg-surface-0! dark:bg-surface-950!`,
      footer: {
        class: `p-0!`,
        id: 'datatable_footer'
      },
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
      <ListHeader
        :showFilters="showFilters"
        @toggleShowFilters="toggleShowFilters"
        @updated="updateElementHeights"
      />
    </template>

    <template #empty>
      <ListEmpty :filters="filters"/>
    </template>

    <ListColumn
      v-for="attribute in listAttributes"
      :key="attribute"
      :attribute="attribute"
      :options="options[attribute]"
      :filteredOptions="filteredOptions[attribute]"
    />

    <template #footer>
      <ListToolbar
        :filtered-count="filteredCount"
        :count="count"
      />
    </template>
  </DataTable>
</template>

<script setup>
const charactersStore = useCharactersStore()
const { resetFilters } = charactersStore

const {
  characters,
  count,
  filters,
  hasAnyAttributeFilters,
  hasAnyFilters,
  hasGlobalFilter,
  options
} = storeToRefs(charactersStore)

const showFilters = ref(false)
const filteredCharacters = ref(characters.value)
const elementHeights = ref("0px")

const filteredCount = computed(() => _size(filteredCharacters.value))

const filteredOptions = computed(() =>
  mapObject(categoryAttributes, (attribute) =>
    uniqValues(filteredCharacters.value, attribute)
  )
)

onUpdated(() => updateElementHeights())

function updatefilteredCharacters(filteredValue) {
  filteredCharacters.value = filteredValue
}

async function showDetail({ id }) {
  await navigateTo({ name: "detail", params: { id } })
}

function toggleShowFilters() {
  showFilters.value = !showFilters.value
}

function updateElementHeights() {
  elementHeights.value = totalElementHeights()
}

function totalElementHeights() {
  // total height of non-datatable elements (in pixels)
  const elements = ["navbar", "datatable_header", "datatable_footer"]

  let totalHeight = _reduce(
    elements,
    (acc, element) => acc + document?.getElementById(element)?.offsetHeight,
    0
  )

  // plus 16px [--spacing(4)] bottom navbar margin
  totalHeight += 16

  return `${totalHeight}px`
}
</script>

<style scoped></style>
