<template>
  <DataTable
    :value="characters"
    dataKey="id"
    v-model:selection="selected"
    selectionMode="single"
    @rowSelect="showDetail(selected)"
    v-model:filters="filters"
    @filter="handleFilter"
    :filterDisplay="showFilters ? 'row' : null"
    removableSort
    scrollable
    scrollHeight="calc(100vw - 88px)"
    size="small"
    stripedRows
    rowHover
    pt:header="pb-0!"
    pt:thead="*:nth-of-type-2:align-top *:nth-of-type-2:*:px-2"
  >
    <template #header>
      <FilterChips
        v-if="hasFilter && !showFilters"
        :filters="filters"
        @remove="removeFilter"
      />
    </template>

    <!--suppress HtmlUnknownBooleanAttribute -->
    <Column
      v-for="attribute in listAttributes"
      :field="attribute"
      :header="_upperCase(attribute)"
      :showFilterMenu="false"
      sortable
    >
      <template #filter="{ filterModel, filterCallback }">
        <Listbox
          v-if="categoryAttributes.includes(attribute)"
          v-model="filterModel.value"
          :options="uniqValues(characters, attribute)"
          @change="filterCallback()"
          multiple
          checkmark
          pt:root="border-0 text-sm"
          pt:option="py-1.5!"
        >
          <template #option="{ option, index }">
            <li
              :id="`filter_${attribute}_${index}`"
              :class="!isValueInFilter(attribute, option) && 'text-surface-400! dark:text-surface-500!'"
            >
              {{ option }}
            </li>
          </template>
        </Listbox>

        <InputText
          v-else
          v-model="filterModel.value"
          type="search"
          @input="filterCallback()"
          placeholder="Filter"
        />
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
const toast = useToast()

const query = useState("query")
const showFilters = useState("showFilters")
const filters = useState("filters", () => initialFilters)

const filtered = ref([])
const selected = ref()

const { data: characters } = await useApi(
  "/characters", {
    query: { q: query },
    transform: (data) => deepParseTimestamps(deepConvertKeys(data, _camelCase)),

    onRequestError: () => toast.add({
      severity: "error",
      summary: "Nope.",
      detail: "Couldn't load characters. The server cannot be reached."
    }),

    onResponseError: () => toast.add({
      severity: "error",
      summary: "Nope.",
      detail: "Couldn't load characters. Something is wrong with the server.",
    })
  }
)

watch(
  characters,
  (newCharacters) => {
    filters.value = initialFilters
    // noinspection JSValidateTypes
    filtered.value = newCharacters
  }
)

function handleFilter({ filteredValue }) {
  filtered.value = filteredValue
}

function isValueInFilter(attribute, value) {
  return _includes(filteredValues(attribute), value)
}

function filteredValues(attribute) {
  return uniqValues(filtered.value, attribute)
}

function removeFilter(attribute, value) {
  filters.value[attribute].value = _without(filters.value[attribute].value, value)
}

function hasFilter() {
  return _some(
    filters.value,
    (value) => isPresent(value.value)
  )
}

async function showDetail({ id }) {
  await navigateTo({ path: `/show-${id}` })
}
</script>

<style scoped>

</style>
