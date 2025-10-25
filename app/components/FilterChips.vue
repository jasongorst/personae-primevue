<template>
  <div class="flex flex-row flex-wrap gap-1">
    <template v-if="hasGlobalFilter">
      <!--suppress JSUnresolvedReference -->
      <Chip
        :label="`Any &ldquo;${filters.global.value}&rdquo;`"
        removable
        pt:root="bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-0!"
        :ptOptions="{ mergeProps: ptViewMerge }"
      >
        <template #removeicon>
          <Icon
            name="ph:x-bold"
            class="hover:bg-primary-200 dark:hover:bg-primary-600 rounded-full p-0.5"
            size="1.25em"
            @click="resetGlobalFilter"
          />
        </template>
      </Chip>
    </template>

    <template
      v-if="hasAnyNameFilters"
      v-for="attribute in nameAttributes"
      :key="attribute"
    >
      <Chip
        v-if="hasFilterFor(attribute)"
        :label="`${_startCase(attribute)} &ldquo;${filters[attribute].value}&rdquo;`"
        removable
        pt:root="bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-0!"
        :ptOptions="{ mergeProps: ptViewMerge }"
      >
        <template #removeicon>
          <Icon
            name="ph:x-bold"
            class="hover:bg-primary-200 dark:hover:bg-primary-600 rounded-full p-0.5"
            size="1.25em"
            @click="resetFilterFor(attribute)"
          />
        </template>
      </Chip>
    </template>

    <template
      v-if="hasAnyCategoryFilters"
      v-for="attribute in categoryAttributes"
      :key="attribute"
    >
      <Chip
        v-if="hasFilterFor(attribute)"
        v-for="value in filters[attribute].value"
        :label="value"
        removable
        pt:root="bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-0!"
        :ptOptions="{ mergeProps: ptViewMerge }"
      >
        <template #removeicon>
          <Icon
            name="ph:x-bold"
            class="hover:bg-primary-200 dark:hover:bg-primary-600 rounded-full p-0.5"
            size="1.25em"
            @click="removeFilterFrom(attribute, value)"
          />
        </template>
      </Chip>
    </template>
  </div>
</template>

<script setup>
const charactersStore = useCharactersStore()
const { hasFilterFor, removeFilterFrom, resetFilterFor, resetGlobalFilter } =
  charactersStore

const { filters, hasAnyCategoryFilters, hasAnyNameFilters, hasGlobalFilter } =
  storeToRefs(charactersStore)
</script>

<style scoped></style>
