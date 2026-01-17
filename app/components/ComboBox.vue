<template>
  <PatchedAutoComplete
    v-model="model"
    :inputId="inputId"
    :suggestions="currentSuggestions"
    :minLength="0"
    :showEmptyMessage="false"
    :completeOnFocus="true"
    fluid
    @complete="(event) => onComplete(event)"
  />
</template>

<script setup>
const model = defineModel()

// noinspection JSCheckFunctionSignatures
const props = defineProps({
  inputId: {
    type: String,
    required: false,
    default: () => useId()
  },

  suggestions: {
    type: Array,
    required: true
  }
})

const currentSuggestions = ref(_cloneDeep(props.suggestions))

function onComplete({ query }) {
  currentSuggestions.value = _filter(props.suggestions, (value) =>
    _startsWith(_lowerCase(value), _lowerCase(query))
  )
}
</script>

<style scoped></style>
