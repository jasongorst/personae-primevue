export const characterQueryKeys = {
  root: ["characterList"],
  options: () => [...characterQueryKeys.root, "options"]
}

export const characterListQuery = defineQueryOptions({
  key: characterQueryKeys.root,
  query: () => useAbortableEmit("character:list")
})

export const characterOptionsQuery = defineQueryOptions({
  key: characterQueryKeys.options,
  query: () => useAbortableEmit("character:options")
})
