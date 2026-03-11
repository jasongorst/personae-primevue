export const userQueryKeys = {
  root: ["userList"]
  // byId: (id) => ["user", id]
}

export const userListQuery = defineQueryOptions({
  key: userQueryKeys.root,
  query: () => useEmit("user:list")
})

// export const userByIdQuery = defineQueryOptions((id) => ({
//   key: userQueryKeys.byId(id),
//   query: () => useEmit("user:read", id)
// }))
