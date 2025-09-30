<template>
  <InitialAutoComplete
    v-model="model"
    v-bind="$attrs"
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
defineOptions({
  inheritAttrs: false
})

const model = defineModel()

// noinspection JSCheckFunctionSignatures
const props = defineProps({
  inputId: {
    type: String,
    required: false,
    default: () => uuid()
  },

  suggestions: {
    type: Array,
    required: true
  }
})

const currentSuggestions = ref(_clone(props.suggestions))

function onComplete({ query }) {
  currentSuggestions.value = _filter(
    props.suggestions,
    (value) => _startsWith(_lowerCase(value), _lowerCase(query))
  )
}
</script>

<style scoped>

</style>
