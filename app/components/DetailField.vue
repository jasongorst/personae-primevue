<template>
  <div
    class="flex flex-col"
    :key="attribute"
  >
    <label
      :for="attribute"
      class="ml-1 text-primary dark:text-primary text-sm"
    >
      {{ _startCase(attribute) }}
    </label>

    <Swap
      :disabled="disabled"
      @active="focusInput"
      ref="swap"
    >
      <template #inactive="{ activate }">
        <div
          v-if="isRichText"
          class="px-3 py-2 border border-transparent trix-content"
          :tabindex="0"
          v-html="model || '&nbsp;'"
        />

        <div
          v-else
          class="px-3 py-2 border border-transparent"
          :tabindex="0"
        >
          {{ model || "&nbsp;" }}
        </div>
      </template>

      <template #active="{ close }">
        <TrixEditor
          v-if="isRichText"
          v-model="model"
          :id="attribute"
          :tabindex="0"
          @blur="close"
          ref="trixEditor"
        />

        <InputText
          v-else-if="type === 'text'"
          v-model="model"
          :id="attribute"
          :tabindex="0"
          fluid
          @blur="close"
        />

        <ComboBox
          v-else
          v-model="model"
          :tabindex="0"
          :inputId="attribute"
          :suggestions="suggestions"
          @blur="onAutoCompleteBlur(close)"
        />
      </template>
    </Swap>
  </div>
</template>

<script setup>
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
      return _includes([ "text", "autocomplete", "richText" ], value)
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

defineExpose({ activate, reset })

const swap = useTemplateRef("swap")
const trixEditor = useTemplateRef("trixEditor")

const isRichText = computed(() => props.type === "richText")

async function focusInput() {
  // wait for Swap
  await nextTick()

  // set focus to input
  const input = document.getElementById(props.attribute)
  input.focus()

  if (isRichText.value) {
    // wait for editor
    await nextTick()

    // place cursor at end of editor content
    const length = input.editor.getDocument().getLength()
    input.editor.setSelectedRange(length - 1)
  } else {
    // place cursor at end of input content
    const length = _isNull(model.value) ? 0 : model.value.length
    input.setSelectionRange(length, length)
  }
}

async function onAutoCompleteBlur(close) {
  // wait for autoComplete animation to complete before closing
  await sleep(200)
  close()
}

function activate() {
  swap.value.activate()
}

function reset() {
  if (isRichText.value) {
    trixEditor.value.reset()
  }
}
</script>

<style scoped>

</style>
