<template>
  {{ $attrs.modelValue }}
  <div
    class="
      flex flex-col justify-between gap-2
      min-h-[calc(--spacing(3)+13.25rem+2px)]
    "
  >
    <Listbox
      v-bind="$attrs"
      multiple
      scrollHeight="12rem"
      pt:root="text-sm"
      pt:list="p-0!"
      pt:option="pl-2 pr-3 py-1!"
      @change="$emit('change', $event)"
    >
      <template #option="{ option, selected, index }">
        <div
          class="flex flex-row items-center gap-1"
          :class="isNotInFilteredValues(option) && 'text-surface-400! dark:text-surface-500!'"
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
      :disabled="isFiltered"
      @click="reset"
    >
      Clear
    </Button>
  </div>
</template>

<script setup>
defineOptions({ inheritAttrs: false })

const props = defineProps({
  filteredValues: {
    type: Array,
    required: true
  },

  reset: {
    type: Function,
    require: true
  }
})

const emits = defineEmits(["change"])

function isNotInFilteredValues(option) {
  return !_includes(props.filteredValues, option)
}

function isFiltered() {
  return true
}
</script>

<style scoped>

</style>