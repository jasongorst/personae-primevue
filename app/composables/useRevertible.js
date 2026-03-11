// noinspection JSUnresolvedReference

export default function useRevertible(initialValue) {
  const original = readonly(toValue(initialValue))
  const model = ref()
  const editedFields = computed(() => findUpdated(original, model.value))
  const isEdited = computed(() => !_isEmpty(editedFields.value))
  const revert = () => (model.value = original)

  // watchEffect(() => (model.value = toValue(initialValue)))

  watch(
    initialValue,
    (newValue, oldValue) => {
      console.log("[useRevertible] [watch] [initialValue]", oldValue, newValue)

      model.value = newValue
    },
    { immediate: true}
  )

  return { original, model, editedFields, isEdited, revert }
}
