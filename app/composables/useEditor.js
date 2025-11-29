export default function useEditor(initialValue) {
  const original = ref(initialValue)
  const model = ref(_cloneDeep(initialValue))
  const updatedFields = computed(() => findUpdated(original.value, model.value))
  const isUpdated = computed(() => !_isEmpty(updatedFields.value))

  const revert = () => {
    model.value = _cloneDeep(original.value)
  }

  return { model, updatedFields, isUpdated, revert }
}
