export const characterQueryKeys = {
  root: ["characters"],
  byId: (id) => [...characterQueryKeys.root, id]
}

export const characterQuery = defineQueryOptions({
  key: characterQueryKeys.root,
  query: () => useEmit("character:list")
})

export const characterByIdQuery = defineQueryOptions((id) => ({
  key: characterQueryKeys.byId(id),
  query: () => useEmit("character:read", id)
}))
