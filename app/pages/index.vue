<template>
  <!--suppress JSValidateTypes -->
  <DataTable
    :value="characters"
    dataKey="id"
    :loading="isLoading"
    sortField="createdAt"
    :sortOrder="1"
    removableSort
    v-model:filters="filters"
    :filterDisplay="showFilters ? 'row' : null"
    :globalFilterFields="globalFilterFields"
    selectionMode="single"
    resizableColumns
    stateStorage="session"
    stateKey="datatable-state"
    scrollable
    :scrollHeight="`calc(100vh - ${elementHeights}px)`"
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
    <Column
      v-for="attribute in _keys(datatableAttributes)"
      :key="attribute"
      :field="attribute"
      :header="_upperCase(attribute)"
      :showFilterMenu="false"
      :sortable="true"
    >
      <template #filter="{ filterModel, filterCallback }">
        <OptionsFilter
          v-if="
            _isMatch(characterAttributes[attribute], { type: 'autocomplete' })
          "
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
          :hasFilter="() => hasFilterFor(attribute)"
          :resetFilter="() => resetFilterFor(attribute)"
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

    <template #header>
      <div :class="isLoading && 'hidden'">
        <div class="flex justify-between gap-4 pb-2">
          <SearchField
            v-model="filters['global'].value"
            placeholder="Search"
            type="search"
            id="global_filter"
          />

          <ClearFiltersButton
            :disabled="!hasAnyFilters"
            @click="resetFilters"
            class="px-4"
          />

          <ToggleFilterButton
            @click="toggleShowFilters"
            class="px-4"
            :showFilters="showFilters"
          />
        </div>

        <CharacterFilterChips
          v-if="hasAnyFilters && !showFilters"
          class="pb-2"
        />
      </div>
    </template>

    <template #empty>
      <div
        class="text-center text-2xl"
        :class="isLoading && 'hidden'"
      >
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
            <span class="italic">&ldquo;{{ filters.global.value }}&rdquo;</span
            >.
          </template>
        </template>

        <template v-else>No characters match the current filters.</template>
      </div>
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
definePageMeta({ name: "characters" })

const { isSignedIn } = useAuthClient()
const filtersStore = useFiltersStore()

const {
  hasAnyAttributeFilters,
  hasAnyFilters,
  hasFilterFor,
  hasGlobalFilter,
  resetFilterFor,
  resetFilters,
  toggleShowFilters
} = filtersStore

const { filters, showFilters } = storeToRefs(filtersStore)

const { data: characters, isLoading: isLoadingCharacters } =
  useQuery(characterListQuery)

const { data: options, isLoading: isLoadingOptions } = useQuery(
  characterOptionsQuery
)

const isLoading = computed(
  () => isLoadingCharacters.value || isLoadingOptions.value
)

const count = computed(() => _size(characters.value))
const filteredCount = computed(() => _size(filteredCharacters.value))
const filteredCharacters = ref(_cloneDeep(characters.value))

const filteredOptions = computed(() =>
  characterOptions(filteredCharacters.value)
)

const DEFAULT_ELEMENT_HEIGHTS = 168
const elementHeights = ref(DEFAULT_ELEMENT_HEIGHTS)

onMounted(() => updateElementHeights())
onUpdated(() => updateElementHeights())

function updateFilteredCharacters(filteredValue) {
  filteredCharacters.value = filteredValue
}

async function showDetail({ id: characterId }) {
  if (isSignedIn.value) {
    await navigateTo({ name: "characterEdit", params: { characterId } })
  } else {
    await navigateTo({ name: "characterView", params: { characterId } })
  }
}

function updateElementHeights() {
  elementHeights.value = totalElementHeights()
}

function totalElementHeights() {
  // total height of non-datatable elements (in pixels)
  const elements = ["navbar", "datatable_header", "datatable_footer"]

  // noinspection JSUnresolvedReference
  let totalHeights = _reduce(
    elements,
    (acc, element) => acc + document?.getElementById(element)?.offsetHeight,
    0
  )

  // plus 16px [--spacing(4)] bottom navbar margin
  totalHeights += 16

  return _isNaN(totalHeights) ? DEFAULT_ELEMENT_HEIGHTS : totalHeights
}
</script>

<style scoped></style>
