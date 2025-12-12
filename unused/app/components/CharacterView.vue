<template>
<!--  <DetailView-->
<!--    v-model="character"-->
<!--    :attributes="schemaAttributes"-->
<!--    :options="options"-->
<!--    @editRequest="(...args) => emit('editRequest', ...args)"-->
<!--    ref="detailView"-->
<!--  />-->

  <Card class="mx-auto max-w-prose">
    <template #content>
      <div class="flex flex-col gap-2">
<!--        <DetailField-->
<!--          v-for="{ attribute, type } in schemaAttributes"-->
<!--          v-model="model[attribute]"-->
<!--          :key="attribute"-->
<!--          :attribute="attribute"-->
<!--          :type="type"-->
<!--          :disabled="!editable"-->
<!--          :suggestions="suggestions[attribute]"-->
<!--          @editRequest="editRequest(attribute)"-->
<!--          :ref="(component) => (detailFields[attribute] = component)"-->
<!--          v-bind="$attrs"-->
<!--        />-->

        <div
          v-for="{ attribute, type } in schemaAttributes"
          :key="attribute"
          class="group flex flex-col"
        >
          <label
            :for="attribute"
            class="ml-1 text-sm text-primary dark:text-primary"
            :class="editable && 'cursor-pointer'"
          >
            {{ _startCase(attribute) }}
          </label>

          <Swap
            :disabled="!editable"
            @active="focusControl"
            ref="swap"
          >
            <template #inactive="{ activate }">
              <div
                v-if="type === 'richText'"
                class="trix-content border border-transparent px-3 py-2"
                :class="editable && 'cursor-pointer group-hover:bg-primary/15'"
                :tabindex="0"
                v-html="character[attribute] || '&nbsp;'"
              />

              <div
                v-else
                class="border border-transparent px-3 py-2"
                :class="editable && 'cursor-pointer group-hover:bg-primary/15'"
                :tabindex="0"
              >
                {{ character[attribute] || "&nbsp;" }}
              </div>
            </template>

            <template #active="{ deactivate }">
              <TrixEditor
                v-if="type === 'richText'"
                v-model="character[attribute]"
                :id="attribute"
                :tabindex="0"
                @blur="deactivate"
                ref="trixEditor"
              />

              <ComboBox
                v-if="type === 'autocomplete'"
                v-model="character[attribute]"
                :tabindex="0"
                :inputId="attribute"
                :suggestions="suggestions[attribute]"
                @blur="onAutoCompleteBlur(deactivate)"
              />

              <InputText
                v-else
                v-model="character[attribute]"
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
        <slot name="buttons" />
      </div>
    </template>
  </Card>
</template>

<script setup>
defineExpose({ activate, reset })
const character = defineModel()
const emit = defineEmits(["editRequest"])
const detailView = useTemplateRef("detailView")
const { options } = storeToRefs(useCharactersStore())

function activate(...args) {
  detailView.value.activate(...args)
}

function reset(...args) {
  detailView.value.reset(...args)
}
</script>

<style scoped></style>
