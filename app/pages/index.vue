<template>
  <div>
    <!-- navbar: line-height 1.5 [1.25rem * 1.5 = 1.875rem]; py-2 [2 * --spacing(2) = --spacing(4) = 16px]; border [2 * 1px = 2px]; mb-4 [--spacing(4) = 16px] -->
    <!-- filter: line-height 1.25 [1.25rem]; py-2 [2 * --spacing(2) = --spacing(4) = 16px]; border [2 * 1px = 2px]; mb-2 [--spacing(2) = 8px] -->
    <!-- toolbar: line-height 1.5 [1.25rem]; py-2 [2 * --spacing(2) = --spacing(4) = 16px]; border [2 * 1px = 2px] -->
    <!-- scrollHeight="calc(100vh - 4.375rem - 78px)" -->
    <!-- TODO: actually needs 85px? why the extra 7px?  -->
    <DataTable
      :value="characters"
      v-model:selection="selectedCharacter"
      v-model:filters="filters"
      :filterDisplay="showFilters ? 'row' : null"
      :globalFilterFields="globalFilterAttributes"
      removableSort
      rowHover
      scrollHeight="calc(100vh - 4.375rem - 85px)"
      scrollable
      selectionMode="single"
      size="small"
      stateKey="datatable-state"
      stateStorage="session"
      stripedRows
      :pt="{
        root: 'pb-[calc(--spacing(6)+1.25rem)]',
        header: 'pb-0!',
        thead: 'bg-surface-0! dark:bg-surface-950!',
        headerRow: 'first-of-type:bg-surface-0 dark:first-of-type:bg-surface-900 nth-of-type-2:align-top nth-of-type-2:*:px-1 nth-of-type-2:*:py-2',
        column: {
          headerCell: 'bg-transparent!'
        }
      }"
      @rowSelect="onRowSelect"
      ref="dataTable"
    >
      <template #header>
        <div class="mb-2 flex gap-4 justify-between">
          <SearchField
            v-model="filters['global'].value"
            placeholder="Search"
            type="search"
          />

          <Button
            variant="outlined"
            :disabled="!hasAnyFilter"
            @click="resetFilters"
            class="px-4"
          >
            <Icon
              name="ph:funnel-simple-x-bold"
              size="1.25rem"
            />

            Clear All
          </Button>

          <Button
            variant="outlined"
            @click="toggleShowFilters"
            class="px-4"
          >
            <Icon
              v-if="showFilters"
              name="ph:eye-slash-bold"
              size="1.25rem"
            />

            <Icon
              v-else
              name="ph:eye-bold"
              size="1.25rem"
            />

            Filters
          </Button>
        </div>

        <FilterChips
          v-if="hasAnyAttributeFilter && !showFilters"
          :filters="filters"
          class="mb-2"
          @remove="removeFilter"
        />
      </template>

      <template #empty>
        <div class="text-2xl text-center">
          <template v-if="hasGlobalFilter && !hasAnyAttributeFilter">
            No characters matching &ldquo;<span class="italic">{{ filters['global'].value }}</span>&rdquo;.
          </template>

          <template v-else-if="hasGlobalFilter && hasAnyAttributeFilter">
            No characters matching &ldquo;<span class="italic">{{ filters['global'].value }}</span>&rdquo; with the current filters.
          </template>

          <template v-else>
            No characters match the current filters.
          </template>
        </div>
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
          <!-- min-height: listbox scrollHeight [12rem] + gap-2 [--spacing(2)] + small button [1.25rem line-height + 2 * py-0.5 [--spacing(0.5)] + 2 * 1px borders] -->
          <!--   = 12em + --spacing() + 1.25rem + --spacing(1) + 2px -->
          <!--   = --spacing(3) + 13.25rem + 2px -->
          <div
            v-if="categoryAttributes.includes(attribute)"
            class="flex flex-col justify-between gap-2 min-h-[calc(--spacing(3)+13.25rem+2px)]"
          >
            <!-- category attribute -->
            <Listbox
              v-model="filterModel.value"
              :options="uniqValues(characters, attribute)"
              multiple
              scrollHeight="12rem"
              pt:root="text-sm"
              pt:list="p-0!"
              pt:option="pl-2 pr-3 py-1!"
              @change="filterCallback"
            >
              <template #option="{ option, selected, index }">
                <div
                  :id="`filter_${attribute}_${index}`"
                  class="flex flex-row items-center gap-1"
                  :class="!isFilteredValue(attribute, option) && 'text-surface-400! dark:text-surface-500!'"
                >
                  <Icon
                    v-if="selected"
                    name="ph:check-bold"
                    size="1em"
                  />

                  <div
                    v-else
                    class="size-[1em]"
                  />

                  {{ option }}
                </div>
              </template>
            </Listbox>

            <Button
              class="py-0.5!"
              variant="outlined"
              size="small"
              fluid
              :disabled="!hasFilterFor(attribute)"
              @click="resetFilterFor(attribute)"
            >
              Clear
            </Button>
          </div>

          <!-- non-category attribute (so a name) -->
          <InputText
            v-else
            v-model="filterModel.value"
            type="search"
            placeholder="Filter"
            @input="filterCallback"
          />
        </template>
      </Column>
    </DataTable>

    <ListToolbar
      :filtered-count="filteredCount"
      :count="count"
    />
  </div>
</template>

<script setup>
const dataTable = useTemplateRef("dataTable")

const charactersStore = useCharactersStore()
const { characters, count, filters, hasAnyAttributeFilter, hasAnyFilter, hasGlobalFilter } = storeToRefs(charactersStore)
const { hasFilterFor, removeFilter, resetFilterFor, resetFilters } = charactersStore

const showFilters = ref(false)
const selectedCharacter = ref(null)

// noinspection JSUnresolvedReference
const filteredCharacters = computed(() => dataTable.value?.processedData)
const filteredCount = computed(() => _size(filteredCharacters.value))

function filteredValues(attribute) {
  return uniqValues(filteredCharacters.value, attribute)
}

function isFilteredValue(attribute, value) {
  return _includes(filteredValues(attribute), value)
}

async function onRowSelect() {
  const id = selectedCharacter.value.id
  selectedCharacter.value = null
  await navigateTo({ name: "edit-id", params: { id: id } })
}

function toggleShowFilters() {
  showFilters.value = !showFilters.value
}
</script>

<style scoped>

</style>
