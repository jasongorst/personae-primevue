// noinspection JSUnresolvedReference

export default function useEditor(initialValue) {
  const original = ref(toValue(initialValue))
  const model = ref(_cloneDeep(original.value))
  const updatedFields = computed(()=> findUpdated(original.value, model.value))
  const isUpdated = computed(() => !_isEmpty(updatedFields.value))
  const revert = () => model.value = _cloneDeep(original.value)

  return { original, model, updatedFields, isUpdated, revert }
}
