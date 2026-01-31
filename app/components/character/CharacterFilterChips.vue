<template>
  <div class="flex flex-row flex-wrap gap-1">
    <template v-if="hasGlobalFilter">
      <!--suppress JSUnresolvedReference -->
      <Chip
        :label="`Anywhere: &ldquo;${filters.global.value}&rdquo;`"
        removable
      >
        <template #removeicon>
          <Icon
            name="ph:x-bold"
            class="rounded-full p-0.5 hover:bg-primary-200 dark:hover:bg-primary-600"
            size="1.25em"
            @click="resetGlobalFilter"
          />
        </template>
      </Chip>
    </template>

    <template
      v-if="hasAnyNameFilters"
      v-for="attribute in _keys(nameAttributes)"
      :key="attribute"
    >
      <Chip
        v-if="hasFilterFor(attribute)"
        :label="`${_startCase(attribute)}: &ldquo;${filters[attribute].value}&rdquo;`"
        removable
      >
        <template #removeicon>
          <Icon
            name="ph:x-bold"
            class="rounded-full p-0.5 hover:bg-primary-200 dark:hover:bg-primary-600"
            size="1.25em"
            @click="resetFilterFor(attribute)"
          />
        </template>
      </Chip>
    </template>

    <template
      v-if="hasAnyCategoryFilters"
      v-for="attribute in _keys(datatableCategoryAttributes)"
      :key="attribute"
    >
      <Chip
        v-if="hasFilterFor(attribute)"
        v-for="value in filters[attribute].value"
        :label="value"
        removable
      >
        <template #removeicon>
          <Icon
            name="ph:x-bold"
            class="rounded-full p-0.5 hover:bg-primary-200 dark:hover:bg-primary-600"
            size="1.25em"
            @click="removeFilterValueFrom(attribute, value)"
          />
        </template>
      </Chip>
    </template>
  </div>
</template>

<script setup>
const charactersStore = useCharactersStore()

const {
  hasFilterFor,
  removeFilterValueFrom,
  resetFilterFor,
  resetGlobalFilter
} = charactersStore

const {
  filters,
  hasAnyCategoryFilters,
  hasAnyNameFilters,
  hasGlobalFilter,
  nameAttributes,
  datatableCategoryAttributes
} = storeToRefs(charactersStore)
</script>

<style scoped></style>
