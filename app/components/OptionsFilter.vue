<template>
  <div class="flex min-h-56.5 flex-col justify-between gap-2">
    <Listbox
      v-model="model"
      :options="options"
      multiple
      scrollHeight="12rem"
      @change="filterCallback"
    >
      <template #option="{ option, selected, index }">
        <div
          :id="`filter_${index}`"
          class="flex w-full flex-row items-center gap-1"
          :class="
            !isFilteredOption(option) &&
            'text-surface-400! dark:text-surface-500!'
          "
        >
          <div class="min-w-[0.875em]">
            <Icon
              v-if="selected"
              name="ph:check-bold"
              size="0.875em"
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

<style scoped></style>
