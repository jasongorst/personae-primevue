<!--suppress HtmlUnknownBooleanAttribute -->
<template>
  <DataTable
    v-model:filters="filters"
    :value="characters"
    @filter="handleFilter"
    dataKey="id"
    :filterDisplay="showFilters ? 'row' : ''"
    removableSort
    size="small"
    striped-rows
    rowHover
    :pt="{
      thead: { class: '*:nth-of-type-2:align-top *:nth-of-type-2:*:px-2' }
    }"
  >
    <template #header>
      <template
        v-if="hasFilter && !showFilters"
        v-for="attribute in categoryAttributes"
        :key="attribute"
      >
        <Chip
          v-for="value in filters[attribute].value"
          :label="value"
          removable
        >
          <template #removeicon="{ removeCallback, keydownCallback }">
            <Icon
              name="ph:x-bold"
              class="p-0.5 rounded-full hover:bg-surface-200 dark:hover:bg-surface-600"
              size="1.25em"
              @click="removeFilter(attribute, value)"
            />
          </template>
        </Chip>
      </template>
    </template>

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
          scrollHeight="100vw"
          :pt="{
            root: { class: 'border-0 text-sm' },
            option: { class: 'py-1.5!' }
          }"
        >
          <template #option="{ option, selected, index }">
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
import { FilterMatchMode } from "@primevue/core/api"
const query = useState("query")
const showFilters = useState("showFilters")

const initialFilters = _fromPairs(
  _map(
    listAttributes,
    (attribute) => [ attribute, {
      value: null,
      matchMode: _includes(categoryAttributes, attribute) ? FilterMatchMode.IN : FilterMatchMode.STARTS_WITH }
    ]
  )
)

const filters = useState("filters", () => initialFilters)

const filtered = ref([])

const { data: characters, status, refresh: loadCharacters } = await useApi(
  "/characters", {
    // manual: true,
    query: { q: query },
    transform: (data) => deepParseTimestamps(deepConvertKeys(data, _camelCase)),

    // onRequestError: () => alert.add(
    //   "Couldn't load characters. The server cannot be reached.", {
    //     severity: "error",
    //     dismissOnLeave: true
    //   }
    // ),
    //
    // onResponseError: () => alert.add(
    //   "Couldn't load characters. Something is wrong with the server.", {
    //     severity: "error",
    //     dismissOnLeave: true
    //   }
    // )
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
  console.log(`[[removeFilter]] ${attribute}: ${value}`)
  console.log()
  filters.value[attribute].value = _without(filters.value[attribute].value, value)
}

function hasFilter() {
  return _some(
    filters.value,
    (value) => isPresent(value.value)
  )
}
</script>

<style scoped>

</style>
