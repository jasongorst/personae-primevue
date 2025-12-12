<template>
  <Card class="mx-auto max-w-prose">
    <template #content>
      <div class="flex flex-col gap-2">
        <DetailField
          v-for="{ attribute, type } in props.attributes"
          v-model="model[attribute]"
          :key="attribute"
          :attribute="attribute"
          :type="type"
          :disabled="!editable"
          :suggestions="suggestions[attribute]"
          @editRequest="editRequest(attribute)"
          :ref="(component) => (detailFields[attribute] = component)"
          v-bind="$attrs"
        />
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
defineOptions({ inheritAttrs: false })
defineExpose({ activate, reset })
const model = defineModel()

const props = defineProps({
  editable: {
    type: Boolean,
    default: true
  },

  attributes: {
    type: Object,
    required: true
  },

  options: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(["editRequest"])
const detailFields = ref({})
const suggestions = ref(_clone(props.options))

async function reset() {
  if (_some(props.attributes, { type: "richText"})) {
    await nextTick()

    _forEach(
      _filter(props.attributes, { type: "richText"} ),
      ({ attribute }) => {
        // noinspection JSUnresolvedReference
        detailFields.value[attribute].reset()
      }
    )
  }
}

function activate(attribute) {
  if (props.editable) {
    // noinspection JSUnresolvedReference
    detailFields.value[attribute].activate()
  }
}

function editRequest(attribute) {
  if (props.editable) {
    emit("editRequest", attribute)
  }
}
</script>

<style scoped></style>
