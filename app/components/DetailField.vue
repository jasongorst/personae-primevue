<template>
  <div
    class="group flex flex-col"
    :key="attribute"
  >
    <label
      :for="attribute"
      class="ml-1 text-sm text-primary dark:text-primary"
      :class="!disabled && 'cursor-pointer'"
    >
      {{ _startCase(attribute) }}
    </label>

    <Swap
      :disabled="disabled"
      :emitRequests="true"
      @active="focusControl"
      @request:activate="editRequest()"
      ref="swap"
    >
      <template #inactive="{ activate }">
        <div
          v-if="props.type === 'richText'"
          class="trix-content border border-transparent px-3 py-2"
          :class="!disabled && 'cursor-pointer group-hover:bg-primary/15'"
          :tabindex="0"
          v-html="model || '&nbsp;'"
        />

        <div
          v-else
          class="border border-transparent px-3 py-2"
          :class="!disabled && 'cursor-pointer group-hover:bg-primary/15'"
          :tabindex="0"
        >
          {{ model || "&nbsp;" }}
        </div>
      </template>

      <template #active="{ deactivate }">
        <TrixEditor
          v-if="props.type === 'richText'"
          v-model="model"
          :id="attribute"
          :tabindex="0"
          @blur="deactivate"
          ref="trixEditor"
        />

        <ComboBox
          v-if="props.type === 'autocomplete'"
          v-model="model"
          :tabindex="0"
          :inputId="attribute"
          :suggestions="suggestions"
          @blur="onAutoCompleteBlur(deactivate)"
        />

        <SelectButton
          v-if="props.type === 'selectButton'"
          v-model="model"
          :id="attribute"
          :tabindex="0"
          :options="suggestions"
          @blur="deactivate"
        />

        <InputText
          v-else
          v-model="model"
          :id="attribute"
          :tabindex="0"
          fluid
          @blur="deactivate"
        />
      </template>
    </Swap>
  </div>
</template>

<script setup>
defineExpose({ activate, reset })
const model = defineModel()

// noinspection JSCheckFunctionSignatures
const props = defineProps({
  attribute: {
    type: String,
    required: true
  },

  type: {
    type: String,
    required: true,
    validator(value) {
      return _includes(
        [
          "text",
          "autocomplete",
          "richText",
          "selectButton",
          "toggle",
          "dateTime"
        ],
        value
      )
    }
  },

  disabled: {
    type: Boolean,
    default: false
  },

  suggestions: {
    type: Array,
    required: false
  }
})

const emit = defineEmits(["editRequest"])
const swap = useTemplateRef("swap")
const trixEditor = useTemplateRef("trixEditor")

async function focusControl() {
  console.log("[focusControl]", props.attribute)

  // wait for Swap
  await nextTick()

  const control = document.getElementById(props.attribute)
  control.focus()

  if (props.type === "richText") {
    // wait for editor
    await nextTick()

    // place cursor at end of editor content
    const length = control.editor.getDocument().getLength()
    control.editor.setSelectedRange(length - 1)
  } else if (_includes(["text", "autocomplete"], props.type)) {
    // place cursor at end of input content
    const length = _isNull(model.value) ? 0 : model.value.length
    control.setSelectionRange(length, length)
  }
}

async function onAutoCompleteBlur(deactivate) {
  // wait for autoComplete animation to complete before closing
  await sleep(200)
  deactivate()
}

function editRequest() {
  if (!props.disabled) {
    emit("editRequest", props.attribute)
  }
}

function activate() {
  if (!props.disabled) {
    swap.value.activate()
  }
}

function reset() {
  if (props.type === "richText") {
    trixEditor.value.reset()
  }
}
</script>

<style scoped></style>
