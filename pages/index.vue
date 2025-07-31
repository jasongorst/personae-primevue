<template>
  <Dialog
    v-if="charactersStore.loading"
    :visible="true"
    modal
    :showHeader="false"
    pt:root:class="bg-transparent! border-0"
    pt:content:class="p-0!"
  >
    <ProgressSpinner :unstyled="false" />
  </Dialog>

  <DataTable
    v-else
    :value="charactersStore.characters"
    v-model:selection="selectedCharacter"
    selectionMode="single"
    v-model:filters="filters"
    :globalFilterFields="apiAttributesList"
    :filterDisplay="showFilters ? 'row' : null"
    removableSort
    scrollable
    scrollHeight="calc(100vh - 180px)"
    size="small"
    stripedRows
    rowHover
    stateStorage="session"
    stateKey="datatable-state-characters"
    :pt="{
      header: 'pb-0!',
      thead: '*:nth-of-type-2:align-top *:nth-of-type-2:*:px-2 *:nth-of-type-2:*:py-2',
      column: {
        headerCell: ''
      }
    }"
    @rowSelect="onRowSelect"
    ref="dataTable"
  >
    <template #header>
      <div class="mb-2 flex gap-4 justify-between">
        <InputThing>
          <template #start>
            <Icon name="ph:magnifying-glass-bold" />
          </template>

          <InputText
            v-model="filters['global'].value"
            placeholder="Search"
            type="search"
            fluid
          />
        </InputThing>

        <Button
          variant="outlined"
          :disabled="!charactersStore.hasAnyFilter"
          @click="charactersStore.resetFilters"
          class="px-4"
        >
          <Icon
            name="ph:funnel-simple-x-bold"
            size="1.25rem"
            class="min-w-[1.25rem]"
          />

          Clear All
        </Button>

        <Button
          variant="outlined"
          @click="toggleShowFilters"
          class="px-4"
        >
          <Icon
            name="ph:funnel-simple-bold"
            size="1.25rem"
            class="min-w-[1.25rem]"
          />

          <div class="flex flex-col">
            <div :class="!showFilters && 'invisible h-0'">Hide</div>
            <div :class="showFilters && 'invisible h-0'">Show</div>
          </div>
        </Button>
      </div>

      <FilterChips
        v-if="charactersStore.hasAnyAttributeFilter && !showFilters"
        :filters="filters"
        class="mb-2"
        @remove="charactersStore.removeFilter"
      />
    </template>

    <template #empty>
      <div class="text-2xl text-center">
        <template v-if="charactersStore.hasGlobalFilter && !charactersStore.hasAnyAttributeFilter">
          No characters matching &ldquo;<span class="italic">{{ filters['global'].value }}</span>&rdquo;.
        </template>

        <template v-else-if="charactersStore.hasGlobalFilter && charactersStore.hasAnyAttributeFilter">
          No characters matching &ldquo;<span class="italic">{{ filters['global'].value }}</span>&rdquo; with the current filters.
        </template>

        <template v-else>
          No characters matching the current filters.
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
<!--        min-height: listbox (14rem) + gap-2 (--spacing(2) + small button (1.25rem line-height + 2 * 0.375rem padding + 2 * 1px borders)-->
        <div
          v-if="categoryAttributes.includes(attribute)"
          class="flex flex-col justify-between gap-2 min-h-[calc(--spacing(2)+16rem+2px)]"
        >
<!--          category attribute -->
          <Listbox
            v-model="filterModel.value"
            :options="uniqValues(charactersStore.characters, attribute)"
            multiple
            scrollHeight="14rem"
            pt:root="border-0 text-sm"
            pt:list="p-0!"
            pt:option="p-0!"
            @change="filterCallback"
          >
            <template #option="{ option, selected, index }">
              <li
                :id="`filter_${attribute}_${index}`"
                class="flex flex-row items-center gap-1"
                :class="!valueIncludedInFiltered(attribute, option) && 'text-surface-400! dark:text-surface-500!'"
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
              </li>
            </template>
          </Listbox>

          <Button
            variant="outlined"
            size="small"
            fluid
            :disabled="!charactersStore.hasFilterFor(attribute)"
            @click="charactersStore.resetFilterFor(attribute)"
          >
            Clear
          </Button>
        </div>

<!--        non-category attribute (i.e., a name) -->
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
const isLoggedIn = computed(() => status.value === "authenticated")
const charactersStore = useCharactersStore()
const { filters } = storeToRefs(charactersStore)
const showFilters = useState("showFilters")
const dataTable = useTemplateRef("dataTable")
const selectedCharacter = ref()

function valueIncludedInFiltered(attribute, value) {
  return _includes(valuesFromFiltered(attribute), value)
}

function valuesFromFiltered(attribute) {
  // noinspection JSUnresolvedReference
  return uniqValues(dataTable.value.processedData, attribute)
}

function onRowSelect() {
  const id = selectedCharacter.value.id
  selectedCharacter.value = null
  naviagateToCharacter(id)
}

async function naviagateToCharacter(id) {
  if (isLoggedIn.value) {
    await navigateTo({ path: `/edit-${id}` })
  } else {
    await navigateTo({ path: `/show-${id}` })
  }
}

function toggleShowFilters() {
  showFilters.value = !showFilters.value
}
</script>

<style scoped>
/*noinspection CssUnusedSymbol*/
.p-progressspinner {
  --p-progressspinner-color-one: var(--color-primary-400);
  --p-progressspinner-color-two: var(--color-primary-900);
  --p-progressspinner-color-three: var(--color-primary-400);
  --p-progressspinner-color-four: var(--color-primary-100);
}
</style>
