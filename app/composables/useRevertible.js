// noinspection JSUnresolvedReference

export default function useRevertible(initialValue) {
  const original = ref(toValue(initialValue))
  const model = ref(_cloneDeep(original.value))
  const editedFields = computed(()=> findUpdated(original.value, model.value))
  const isEdited = computed(() => !_isEmpty(editedFields.value))

  function revert() {
    model.value = _cloneDeep(original.value)
  }

  return {
    original,
    model,
    editedFields,
    isEdited,
    revert
  }
}
