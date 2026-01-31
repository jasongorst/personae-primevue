<!--suppress VueUnrecognizedSlot -->
<template>
  <Card class="mx-auto max-w-prose">
    <template #content>
      <div class="flex flex-col gap-2">
        <Message
          v-if="isPresent(formErrors)"
          severity="error"
          pt:root="border border-transparent"
        >
          {{ _join(formErrors, " ") }}
        </Message>

        <div
          v-for="({ type }, attribute) in props.attributes"
          :key="attribute"
          class="group flex flex-col"
        >
          <Swap
            :disabled="props.action === 'view'"
            @active="focusFormControl(attribute, type)"
            @inactive="validate(attribute)"
          >
            <template #default>
              <label
                :for="attribute"
                class="ml-1 block text-sm text-primary dark:text-primary"
                :class="props.action !== 'view' && 'cursor-pointer'"
              >
                {{ _startCase(attribute) }}
              </label>
            </template>

            <template #inactive="{ activate }">
              <div
                v-if="type === 'richText'"
                class="trix-content border border-transparent px-3 py-2"
                :class="
                  props.action !== 'view' &&
                  'cursor-pointer group-hover:bg-primary/15'
                "
                :tabindex="0"
                v-html="model?.[attribute] || '&nbsp;'"
              />

              <div
                v-else
                class="border border-transparent px-3 py-2"
                :class="
                  props.action !== 'view' &&
                  'cursor-pointer group-hover:bg-primary/15'
                "
                :tabindex="0"
              >
                {{ model?.[attribute] || "&nbsp;" }}
              </div>
            </template>

            <template #active="{ deactivate }">
              <TrixEditor
                v-if="type === 'richText'"
                v-model="model[attribute]"
                :id="attribute"
                :tabindex="0"
                @blur="waitForAnimation(deactivate)"
                :ref="(trixEditor) => (trixEditors[attribute] = trixEditor)"
              />

              <Select
                v-else-if="type === 'select'"
                v-model="model[attribute]"
                :tabindex="0"
                :labelId="attribute"
                fluid
                :options="options?.[attribute]"
                @blur="waitForAnimation(deactivate)"
                :ref="(select) => (selects[attribute] = select)"
              />

              <ComboBox
                v-else-if="type === 'autocomplete'"
                v-model="model[attribute]"
                :tabindex="0"
                :inputId="attribute"
                :suggestions="suggestions?.[attribute]"
                @blur="waitForAnimation(deactivate)"
              />

              <InputText
                v-else
                v-model="model[attribute]"
                :id="attribute"
                :tabindex="0"
                fluid
                @blur="waitForAnimation(deactivate)"
              />
            </template>
          </Swap>

          <Message
            v-if="fieldErrors?.[attribute]"
            severity="error"
            size="small"
            variant="simple"
            class="ml-1"
          >
            {{ _join(fieldErrors?.[attribute], " ") }}
          </Message>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="mt-4 flex flex-row justify-end gap-3">
        <template v-if="isEdited">
          <Button
            severity="warn"
            @click="confirmReset"
          >
            Reset
          </Button>

          <Button
            :disabled="!valid"
            @click="save"
          >
            Save
          </Button>
        </template>

        <template v-else>
          <Button
            v-if="props.action === 'edit'"
            severity="danger"
            @click="confirmDelete"
          >
            Delete
          </Button>

          <Button>
            <!--suppress HtmlUnknownTarget, JSValidateTypes -->
            <NuxtLink :to="props.redirectBack">Back</NuxtLink>
          </Button>
        </template>
      </div>
    </template>
  </Card>
</template>

<script setup>
import * as z from "zod"

const selects = ref({})
const trixEditors = ref({})

const props = defineProps({
  name: {
    type: String,
    required: true
  },

  modelId: {
    type: [String, Number],
    required: false,
    validator: (value, props) => props.action === "create" || isPresent(value)
  },

  action: {
    type: String,
    required: false,
    default: "edit",
    validator: (value) => _includes(["create", "edit", "view"], value)
  },

  attributes: {
    type: Object,
    required: true
  },

  initialValue: {
    type: Object,
    required: true
  },

  options: {
    type: Object,
    default: {},
    required: false
  },

  isSaved: {
    type: Boolean,
    required: true
  },

  redirectBack: {
    type: [String, Object],
    required: true
  },

  schema: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(["reset", "back", "delete", "create", "update"])

const confirm = useConfirm()
const toast = useToast()

const { model, editedFields, isEdited, revert } = useRevertible(
  props.initialValue
)

const suggestions = ref(_clone(props.options))

const valid = ref(true)
const formErrors = ref([])
const fieldErrors = ref({})

onBeforeRouteLeave(async () => {
  if (isEdited.value && !props.isSaved && !(await confirmLeave())) {
    return false
  }
})

async function focusFormControl(attribute, type) {
  await nextTick()
  const control = document.getElementById(attribute)
  control.focus()

  switch (type) {
    case "select": {
      // noinspection JSUnresolvedReference
      selects.value[attribute].show()
      break
    }

    case "richText": {
      await nextTick()
      const length = control.editor.getDocument().getLength()
      control.editor.setSelectedRange(length - 1)
      break
    }

    default: {
      const length = _isNull(model.value[attribute])
        ? 0
        : model.value[attribute].length
      control.setSelectionRange(length, length)
    }
  }
}

async function waitForAnimation(deactivate) {
  await callAfterDelay(deactivate, 200)
}

async function reset() {
  revert()
  formErrors.value = []
  fieldErrors.value = {}
  await nextTick()

  _forEach(
    _keys(_pickBy(props.attributes, { type: "richText" })),
    (attribute) => {
      // noinspection JSUnresolvedReference
      trixEditors.value[attribute].reset()
    }
  )

  emit("reset")
}

function validate(attribute = null) {
  const result = props.schema.safeParse(
    props.action === "create" ? model.value : editedFields.value
  )

  if (result.success) {
    valid.value = true
    formErrors.value = []
    fieldErrors.value = {}
  } else {
    valid.value = false
    const flattened = z.flattenError(result.error)
    formErrors.value = flattened.formErrors

    if (attribute) {
      fieldErrors.value[attribute] = flattened.fieldErrors[attribute]
    } else {
      fieldErrors.value = flattened.fieldErrors
    }
  }

  return result
}

function save() {
  const result = validate()

  if (result.success) {
    emit(props.action, result.data)
  } else {
    console.error(
      "save() called with invalid data",
      z.flattenError(result.error)
    )
  }
}

function confirmDelete() {
  confirm.require({
    header: "Really?",
    icon: "ph:warning-bold",
    message: `Do you want to delete this ${props.name}?`,
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
    message: `Do you want to reset this ${props.name}?`,
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
      message: `Do you want to abandon this ${props.name}?`,
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
