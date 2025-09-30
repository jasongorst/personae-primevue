<template>
  <Card class="max-w-prose mx-auto">
    <template #content>
      <div class="flex flex-col gap-2">
        <div
          class="flex flex-col"
          v-for="{ attribute, type } in schemaAttributes"
          :key="attribute"
        >
          <label
            :for="attribute"
            class="ml-1 text-primary dark:text-primary text-sm"
          >
            {{ _startCase(attribute) }}
          </label>

          <AttributeDetail
            v-model="character[attribute]"
            :attribute="attribute"
            :type="type"
            :disabled="!editable"
            :suggestions="suggestions[attribute]"
            :ref="(component) => { attributes[attribute] = component }"
          />
        </div>
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
const suggestions = ref(_clone(options.value))

async function reset() {
  await nextTick()

  // noinspection JSUnresolvedReference
  _forEach(
    richTextAttributes,
    (attribute) => attributes.value[attribute].reset()
  )
}
</script>

<style scoped>

</style>
