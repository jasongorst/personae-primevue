// noinspection JSIgnoredPromiseFromCall

export const useUpdateUser = defineMutation(() => {
  const queryCache = useQueryCache()

  const { mutate, ...mutation } = useMutation({
    onMutate({ id, updates }) {
      const oldUsers = queryCache.getQueryData(userListQuery.key)
      const oldUser = queryCache.getQueryData(userByIdQuery(id).key)

      const newUser = { ...oldUser, ...updates }
      const newUsers = [...oldUsers, newUser]

      queryCache.setQueryData(userListQuery.key, newUsers)
      queryCache.setQueryData(userByIdQuery(id).key, newUser)
      queryCache.cancelQueries({ key: userListQuery.key })
      queryCache.cancelQueries({ key: userByIdQuery(id).key })

      return { oldUser, newUser, oldUsers, newUsers }
    },

    mutation: ({ id, attributes }) => useEmit("user:update", id, attributes),

    onSettled(_data, _error, { id }, { newUser }) {
      if (newUser) {
        queryCache.invalidateQueries({ key: userListQuery.key })
        queryCache.invalidateQueries({ key: userByIdQuery(id).key })
      }
    },

    onError(err, { id }, { oldUser, newUser, oldUsers, newUsers }) {
      if (newUsers === queryCache.getQueryData(userListQuery.key)) {
        queryCache.setQueryData(userListQuery.key, oldUsers)
      }

      if (queryCache.getQueryData(userByIdQuery(id).key) === newUser) {
        queryCache.setQueryData(userByIdQuery(id).key, oldUser)
      }

      // handle the error
      console.error("[useUpdateUser] [onError]", err)
    },

    onSuccess() {}
  })

  return {
    ...mutation,
    updateUser: (id, attributes) => mutate({ id, attributes })
  }
})
