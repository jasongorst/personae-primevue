<template>
  <div class="flex flex-col justify-between gap-2 min-h-[calc(--spacing(3)+13.25rem+2px)]">
    <Listbox
      v-model="model"
      :options="options"
      multiple
      scrollHeight="12rem"
      pt:root="text-sm"
      pt:list="p-0!"
      pt:option="pl-2 pr-3 py-1!"
      @change="filterCallback"
    >
      <template #option="{ option, selected, index }">
        <div
          :id="`filter_${index}`"
          class="flex flex-row items-center gap-1"
          :class="!isFilteredOption(option) && 'text-surface-400! dark:text-surface-500!'"
        >
          <div>
            <Icon
              v-if="selected"
              name="ph:check-bold"
              size="1em"
            />

            <span
              v-else
              class="inline-block size-[1em]"
            />
          </div>

          <div class="truncate">
            {{ option }}
          </div>
        </div>
      </template>
    </Listbox>

    <Button
      class="py-0.5!"
      variant="outlined"
      size="small"
      fluid
      :disabled="!hasFilter()"
      @click="resetFilter"
    >
      Clear
    </Button>
  </div>
</template>

<script setup>
const model = defineModel()

const props = defineProps({
  options: {
    type: Array,
    required: true
  },

  filteredOptions: {
    type: Array,
    required: true
  },

  filterCallback: {
    type: Function,
    required: true
  },

  hasFilter: {
    type: Function,
    required: true
  },

  resetFilter: {
    type: Function,
    required: true
  }
})

function isFilteredOption(option) {
  return _includes(props.filteredOptions, option)
}
</script>

<style scoped>

</style>
