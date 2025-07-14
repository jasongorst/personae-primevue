<template>
  <TrixEditor
    v-model="model"
    :id="id"
    ref="trixEditor"
  />
</template>

<script setup>
const trixEditor = useTemplateRef("trixEditor")
const model = defineModel()

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

defineExpose({
  reset() { trixEditor.value.reset() }
})
</script>

<style scoped>

</style>
