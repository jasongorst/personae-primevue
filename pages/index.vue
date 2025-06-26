<template>
  <DataTable
    :value="characters"
    dataKey="id"
    v-model:selection="selected"
    selectionMode="single"
    v-model:filters="filters"
    :filterDisplay="showFilters ? 'row' : null"
    removableSort
    scrollable
    scrollHeight="calc(100vw - 88px)"
    size="small"
    stripedRows
    rowHover
    stateStorage="session"
    stateKey="datatable-state-characters"
    pt:header="pb-0!"
    pt:thead="*:nth-of-type-2:align-top *:nth-of-type-2:*:px-2"
    @filter="onFilter"
    @rowSelect="onRowSelect"
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
          multiple
          checkmark
          pt:root="border-0 text-sm"
          pt:option="py-1.5!"
          @change="filterCallback()"
        >
          <template #option="{ option, index }">
            <li
              :id="`filter_${attribute}_${index}`"
              :class="!valueIsInFilter(attribute, option) && 'text-surface-400! dark:text-surface-500!'"
            >
              {{ option }}
            </li>
          </template>
        </Listbox>

        <InputText
          v-else
          v-model="filterModel.value"
          type="search"
          placeholder="Filter"
          @input="filterCallback()"
        />
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
const toast = useToast()
const { status } = useAuth()

const query = useState("query")
const showFilters = useState("showFilters")
const filters = useState("filters", () => initialFilters)

const isLoggedIn = computed(() => status.value === "authenticated")

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
  characters, (newCharacters) => {
    filters.value = initialFilters
    // noinspection JSValidateTypes
    filtered.value = newCharacters
  }
)

function onFilter({ filteredValue }) {
  filtered.value = filteredValue
}

function valueIsInFilter(attribute, value) {
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

function onRowSelect() {
  const id = selected.value.id
  selected.value = null
  showDetail(id)
}

async function showDetail(id) {
  if (isLoggedIn.value) {
    await navigateTo({ path: `/edit-${id}` })
  } else {
    await navigateTo({ path: `/show-${id}` })
  }
}
</script>

<style scoped>

</style>
