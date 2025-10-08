<template>
  <Card class="max-w-prose mx-auto">
    <template #content>
      <div class="flex flex-col gap-2">
        <DetailField
          v-for="{ attribute, type } in detailAttributes"
          v-model="character[attribute]"
          :key="attribute"
          :attribute="attribute"
          :type="type"
          :disabled="!editable"
          :suggestions="suggestions[attribute]"
          @click.capture.stop="editRequest(attribute)"
          :ref="(component) => detailFields[attribute] = component"
        />
      </div>
    </template>

    <template #footer>
      <div class="mt-4 flex flex-row gap-3 justify-end">
        <slot name="buttons" />
      </div>
    </template>
  </Card>
</template>

<script setup>
defineExpose({ activate, reset })
const character = defineModel()

const props = defineProps({
  editable: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits([ "editRequest" ])
const detailFields = ref({})
const { options } = storeToRefs(useCharactersStore())
const suggestions = ref(_clone(options.value))

async function reset() {
  await nextTick()

  // noinspection JSUnresolvedReference
  _forEach(
    richTextAttributes,
    (attribute) => detailFields.value[attribute].reset()
  )
}

function activate(attribute) {
  // noinspection JSUnresolvedReference
  detailFields.value[attribute].activate()
}

function editRequest(attribute) {
  if (!props.editable) {
    return false
  }

  emit("editRequest", attribute)
}
</script>

<style scoped>

</style>
