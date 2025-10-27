<template>
  <DataTable
    :value="characters"
    dataKey="id"
    :loading="loading"
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
      footer: { id: 'datatable_footer' }
    }"
    @filter="(event) => updatefilteredCharacters(event.filteredValue)"
    @rowSelect="(event) => showDetail(event.data)"
  >
    <!--    <template #loading>-->
    <!--      <SpinnerModal :visible="loading" />-->
    <!--    </template>-->

    <template #header>
      <ListHeader
        :showFilters="showFilters"
        @toggleShowFilters="toggleShowFilters"
        @updated="updateElementHeights"
      />
    </template>

    <template #empty>
      <ListEmpty :filters="filters" />
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
  loading,
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
