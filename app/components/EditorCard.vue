<!--suppress VueUnrecognizedSlot -->
<template>
  <Card class="mx-auto max-w-prose">
    <template #content>
      <div class="flex flex-col gap-2">
        <div
          v-for="{ attribute, type } in props.attributes"
          :key="attribute"
          class="group flex flex-col"
        >
          <Swap @active="focusFormControl({ attribute, type })">
            <template #default>
              <label
                :for="attribute"
                class="ml-1 block cursor-pointer text-sm text-primary dark:text-primary"
              >
                {{ _startCase(attribute) }}
              </label>
            </template>

            <template #inactive="{ activate }">
              <div
                v-if="type === 'richText'"
                class="trix-content cursor-pointer border border-transparent px-3 py-2
                  group-hover:bg-primary/15"
                :tabindex="0"
                v-html="model?.[attribute] || '&nbsp;'"
              />

              <divz
                v-else
                class="cursor-pointer border border-transparent px-3 py-2 group-hover:bg-primary/15"
                :tabindex="0"
              >
                {{ model?.[attribute] || "&nbsp;" }}
              </divz>
            </template>

            <template #active="{ deactivate }">
              <TrixEditor
                v-if="type === 'richText'"
                v-model="model[attribute]"
                :id="attribute"
                :tabindex="0"
                @blur="deactivate"
                :ref="(trixEditor) => (trixEditors[attribute] = trixEditor)"
              />

              <ComboBox
                v-else-if="type === 'autocomplete'"
                v-model="model[attribute]"
                :tabindex="0"
                :inputId="attribute"
                :suggestions="suggestions[attribute]"
                @blur="onAutoCompleteBlur(deactivate)"
              />

              <InputText
                v-else
                v-model="model[attribute]"
                :id="attribute"
                :tabindex="0"
                fluid
                @blur="deactivate"
              />
            </template>
          </Swap>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="mt-4 flex flex-row justify-end gap-3">
        <slot
          name="actions"
          :isEdited="isEdited"
        >
          <template v-if="isEdited">
            <Button
              severity="warn"
              @click="confirmReset"
            >
              Reset
            </Button>

            <Button @click="save">Save</Button>
          </template>

          <template v-else>
            <Button @click="emit('back', isEdited)">Back</Button>

            <Button
              v-if="props.action === 'edit'"
              severity="danger"
              @click="confirmDelete"
            >
              Delete
            </Button>
          </template>
        </slot>
      </div>
    </template>
  </Card>
</template>

<script setup>
const trixEditors = ref({})

const props = defineProps({
  action: {
    type: String,
    default: "edit",
    validator: (value) => _includes(["create", "edit", "view"], value)
  },

  attributes: {
    type: Array,
    required: true
  },

  initialValue: {
    type: Object
  },

  options: {
    type: Object
  },

  isSaved: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(["reset", "back", "delete", "create", "update"])

const confirm = useConfirm()
const toast = useToast()

const { model, editedFields, isEdited, revert } = useRevertible(
  props.initialValue
)

const suggestions = ref(_clone(props.options))

onBeforeRouteLeave(async () => {
  if (isEdited.value && !props.isSaved && !(await confirmLeave())) {
    return false
  }
})

async function focusFormControl({ attribute, type }) {
  // wait for Swap
  await nextTick()

  const control = document.getElementById(attribute)
  control.focus()

  if (type === "richText") {
    // wait for editor
    await nextTick()

    // place cursor at end of editor content
    const length = control.editor.getDocument().getLength()
    control.editor.setSelectedRange(length - 1)
  } else if (_includes(["text", "autocomplete"], type)) {
    // place cursor at end of input content
    // noinspection JSUnresolvedReference
    const length = _isNull(model.value[attribute])
      ? 0
      : model.value[attribute].length
    control.setSelectionRange(length, length)
  }
}

async function onAutoCompleteBlur(deactivate) {
  // wait for animation to complete
  await sleep(200)
  deactivate()
}

async function reset() {
  revert()
  await nextTick()

  _forEach(_filter(schemaAttributes, { type: "richText" }), ({ attribute }) => {
    // noinspection JSUnresolvedReference
    trixEditors.value[attribute].reset()
  })

  emit("reset")
}

function save() {
  if (props.action === "create") {
    emit("create", model.value)
  } else {
    emit("update", editedFields.value)
  }
}

function confirmDelete() {
  confirm.require({
    header: "Really?",
    icon: "ph:warning-bold",
    message: "Do you want to delete this user?",
    defaultFocus: "reject",

    acceptProps: {
      label: "Delete",
      severity: "danger"
    },

    rejectProps: { label: "Cancel" },
    accept: () => emit("delete"),

    reject: () =>
      toast.add({
        severity: "info",
        summary: "Cancelled.",
        detail: "Delete cancelled.",
        life: 3000
      })
  })
}

function confirmReset() {
  // noinspection JSUnusedGlobalSymbols
  const confirmOptions = {
    header: "Reset?",
    icon: "ph:warning-bold",
    message: "Do you want to reset this user?",
    defaultFocus: "reject",

    acceptProps: {
      label: "Reset",
      severity: "warn"
    },

    rejectProps: { label: "Cancel" },
    accept: async () => await reset(),

    reject: () =>
      toast.add({
        severity: "info",
        summary: "Cancelled.",
        detail: "Reset cancelled.",
        life: 3000
      })
  }

  if (props.action === "create") {
    _assign(confirmOptions, {
      header: "Revert?",
      message: "Do you want to revert your edits?",

      acceptProps: {
        label: "Revert",
        severity: "warn"
      },

      reject: () =>
        toast.add({
          severity: "info",
          summary: "Cancelled.",
          detail: "Revert cancelled.",
          life: 3000
        })
    })
  }

  confirm.require(confirmOptions)
}

async function confirmLeave() {
  const modal = new Promise((resolve) => {
    // noinspection JSUnusedGlobalSymbols
    const confirmOptions = {
      header: "Leave?",
      icon: "ph:warning-bold",
      message: "Do you want to abandon this user?",
      defaultFocus: "reject",

      acceptProps: {
        label: "Leave",
        severity: "danger"
      },

      rejectProps: { label: "Cancel" },

      accept: () => resolve(true),
      reject: () => resolve(false)
    }

    if (props.action === "create") {
      _assign(confirmOptions, {
        message: "Do you want to abandon your edits?"
      })
    }

    confirm.require(confirmOptions)
  })

  return await modal
}
</script>

<style scoped></style>
