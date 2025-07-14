<template>
  <FormField
    v-slot="$field"
    :id="`${id}_field`"
    :name="name"
    :initialValue="model"
  >
    <TrixEditor
      v-model="$field.value"
      :id="id"
      :class="[{ error: $field?.invalid }]"
      @change="$field.onChange"
      @input="$field.onInput"
      @blur="(event) => { emit('blur', event); $field.onBlur }"
      ref="trixEditor"
    />
  </FormField>
</template>

<script setup>
const trixEditor = useTemplateRef("trixEditor")

const model = defineModel()

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  }
})

const emit = defineEmits([ "blur" ])

defineExpose({
  reset() { trixEditor.value.reset() }
})
</script>

<style scoped>

</style>
