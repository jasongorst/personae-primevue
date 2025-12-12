<template>
  <DataTable
    :value="characters"
    dataKey="id"
    :loading="isLoading"
    sortField="createdAt"
    :sortOrder="1"
    removableSort
    v-model:filters="filters"
    :filterDisplay="showFilters ? 'row' : null"
    :globalFilterFields="globalFilterAttributes"
    selectionMode="single"
    resizableColumns
    stateStorage="session"
    stateKey="datatable-state"
    scrollable
    :scrollHeight="`calc(100vh - ${elementHeights})`"
    size="small"
    :pt="{
      header: { id: 'datatable_header' },
      footer: { id: 'datatable_footer' },
      column: {
        headerCell: 'max-w-[8rem]',
        bodyCell: 'max-w-[8rem]'
     }
    }"
    @filter="(event) => updateFilteredCharacters(event.filteredValue)"
    @rowSelect="(event) => showDetail(event.data)"
  >
    <CharacterColumn
      v-for="attribute in listAttributes"
      :key="attribute"
      :attribute="attribute"
      :options="options[attribute]"
      :filteredOptions="filteredOptions[attribute]"
    />

    <template #header>
      <CharacterFilters
        :class="isLoading && 'hidden'"
        :showFilters="showFilters"
        @toggleShowFilters="toggleShowFilters"
        @updated="updateElementHeights"
      />
    </template>

    <template #empty>
      <CharacterEmpty
        :class="isLoading && 'hidden'"
        :filters="filters"
      />
    </template>

    <template #loading>
      <SpinnerModal
        :visible="true"
        maskClass="bg-surface!"
      />
    </template>

    <template #footer>
      <CharacterToolbar
        :class="isLoading && 'hidden'"
        :filteredCount="filteredCount"
        :count="count"
      />
    </template>
  </DataTable>
</template>

<script setup>
const charactersStore = useCharactersStore()

const {
  characters,
  count,
  filters,
  isLoading,
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

onMounted(() => updateElementHeights())
onUpdated(() => updateElementHeights())

function updateFilteredCharacters(filteredValue) {
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

  return _isNaN(totalHeight) ? 0 : `${totalHeight}px`
}
</script>

<style scoped></style>
