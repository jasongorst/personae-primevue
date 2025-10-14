<template>
  <Card class="mx-auto max-w-prose">
    <template #content>
      <div class="flex flex-col gap-2">
        <div
          class="flex flex-col"
          v-for="{ attribute, type } in schemaAttributes"
          :key="attribute"
        >
          <label
            :for="attribute"
            class="text-primary dark:text-primary ml-1 text-sm"
          >
            {{ _startCase(attribute) }}
          </label>

          <AttributeDetail
            v-model="character[attribute]"
            :attribute="attribute"
            :type="type"
            :disabled="!editable"
            :suggestions="suggestions[attribute]"
            :ref="
              (component) => {
                attributes[attribute] = component
              }
            "
          />
        </div>
      </div>
    </template>

    <template #footer>
      <div class="mt-4 flex flex-row justify-end gap-3">
        <slot name="buttons" />
      </div>
    </template>
  </Card>
</template>

<script setup>
const character = defineModel()

const props = defineProps({
  editable: {
    type: Boolean,
    default: true
  }
})

defineExpose({ reset })

const attributes = ref({})

const charactersStore = useCharactersStore()
const { options } = storeToRefs(charactersStore)
const suggestions = ref(_cloneDeep(options.value))

async function reset() {
  await nextTick()

  // noinspection JSUnresolvedReference
  _forEach(richTextAttributes, (attribute) =>
    attributes.value[attribute].reset()
  )
}
</script>

<style scoped></style>
