// noinspection JSIgnoredPromiseFromCall

export const useDeleteUser = defineMutation(() => {
  const queryCache = useQueryCache()

  const { mutate, ...mutation } = useMutation({
    onMutate(id) {
      const oldUserList = queryCache.getQueryData(userListQuery.key)
      const oldUser = queryCache.getQueryData(userByIdQuery(id).key)
      const newUserList = _reject(oldUserList, { id })

      queryCache.setQueryData(userListQuery.key, newUserList)
      queryCache.remove({ key: userByIdQuery(id).key })
      queryCache.cancelQueries({ key: userListQuery.key })
      queryCache.cancelQueries({ key: userByIdQuery(id).key })

      return { oldUser, oldUserList, newUserList }
    },

    mutation: (id) => useEmit("user:delete", id),

    onSettled(_data, _error, id) {
      queryCache.invalidateQueries({ key: userListQuery.key })
      queryCache.invalidateQueries({ key: userByIdQuery(id).key })
    },

    onError(err, id, { oldUser, oldUserList, newUserList }) {
      if (newUserList === queryCache.getQueryData(userListQuery.key)) {
        queryCache.setQueryData(userListQuery.key, oldUserList)
      }

      if (queryCache.getQueryData(userByIdQuery(id).key) === undefined) {
        queryCache.ensure(userByIdQuery(id))
        queryCache.setQueryData(userByIdQuery(id).key, oldUser)
      }

      // handle the error
      console.error("[useDeleteUser] [onError]", err)
    },

    onSuccess() {}
  })

  return {
    ...mutation,
    deleteUser: (id) => mutate(id)
  }
})
