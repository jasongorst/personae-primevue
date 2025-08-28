<template>
  <div>
    <input
      type="hidden"
      :id="`${id}_input`"
      :value="initialValue"
    />

    <trix-editor
      v-bind="$attrs"
      class="trix-content"
      :id="id"
      :input="`${id}_input`"
      @trix-change="onTrixChange"
      @trix-focus="onTrixFocus"
      @trix-blur="onTrixBlur"
      @trix-before-initialize="onTrixBeforeInitialize"
      @trix-initialize="onTrixInitialize"
      @trix-paste="onTrixPaste"
      @trix-selection-change="onTrixSelectionChange"
      @trix-file-accept.prevent="onTrixFileAccept"
      @trix-attachment-add="onTrixAttachmentAdd"
      @trix-attachment-remove="onTrixAttachmentRemove"
      ref="trixEditor"
    />
  </div>
</template>

<script setup>
import Trix from "trix"

defineOptions({
  inheritAttrs: false
})

const trixEditor = useTemplateRef("trixEditor")
const model = defineModel()

const props = defineProps({
  id: {
    type: String,
    required: false,
    default: () => uuid()
  },

  // override default editor config
  config: {
    type: Object,
    required: false,
    default: () => {}
  }
})

defineExpose({
  id: props.id,
  modelValue: model,
  reset() { reset() }
})

const emit = defineEmits([
  "blur",
  "change",
  "focus",
  "input",
  "trix-attachment-add",
  "trix-attachment-remove",
  "trix-before-initialize",
  "trix-blur",
  "trix-change",
  "trix-file-accept",
  "trix-focus",
  "trix-initialize",
  "trix-paste",
  "trix-selection-change"
])

const initialValue = ref(_isNull(model.value) ? "" : model.value)

onBeforeMount(() => {
  _merge(Trix.config, trixConfig, props.config)
})

async function reset() {
  if (_isNull(model.value)) {
    model.value = ""
    await nextTick()
  }

  trixEditor.value?.editor.loadHTML(model.value)
}

function onTrixChange(event) {
  model.value = event.target.value

  emit("change", event)
  emit("input", event)
  emit("trix-change", event)
}

function onTrixInitialize(event) {
  reset()

  emit("trix-initialize", event)
}

// just re-emitting these
function onTrixFocus(event) {
  emit("focus", event)
  emit("trix-focus", event)
}

function onTrixBlur(event) {
  emit("blur", event)
  emit("trix-blur", event)
}

function onTrixBeforeInitialize(event) {
  emit("trix-before-initialize", event)
}

function onTrixPaste(event) {
  emit("trix-paste", event)
}

function onTrixSelectionChange(event) {
  emit("trix-selection-change", event)
}

function onTrixFileAccept(file) {
  emit("trix-file-accept", file)
}

function onTrixAttachmentAdd(file) {
  emit("trix-attachment-add", file)
}

function onTrixAttachmentRemove(file) {
  emit("trix-attachment-remove", file)
}
</script>

<style>
@reference "~/assets/css/main.css";

trix-editor {
  /* textarea.root */
  /* min-height: py-2 [--spacing(4)] + border [2 * 1px = 2px] + line-height [1.5rem] */
  @apply min-h-[calc(--spacing(4)+2px+1.5rem)]
  appearance-none rounded-md outline-hidden
  bg-surface-0 dark:bg-surface-950
  p-filled:bg-surface-50 dark:p-filled:bg-surface-800
  text-surface-700 dark:text-surface-0
  placeholder:text-surface-500 dark:placeholder:text-surface-400
  border border-surface-300 dark:border-surface-700
  enabled:hover:border-surface-400 dark:enabled:hover:border-surface-600
  enabled:focus:border-primary
  disabled:bg-surface-200 disabled:text-surface-500
  dark:disabled:bg-surface-700 dark:disabled:text-surface-400
  p-invalid:border-red-400 dark:p-invalid:border-red-300
  p-invalid:placeholder:text-red-600 dark:p-invalid:placeholder:text-red-400
  px-3 py-2 p-fluid:w-full
  p-small:text-sm p-small:px-[0.625rem] p-small:py-[0.375rem]
  p-large:text-lg p-large:px-[0.875rem] p-large:py-[0.625rem]
  transition-colors duration-200 shadow-[0_1px_2px_0_rgba(18,18,23,0.05)]
}
</style>
