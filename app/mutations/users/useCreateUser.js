// noinspection JSIgnoredPromiseFromCall

import { v4 as uuid } from "uuid"

export const useCreateUser = defineMutation(() => {
  const queryCache = useQueryCache()

  const { mutateAsync, ...mutation } = useMutation({
    onMutate(user) {
      // save current user list
      const oldUserList = queryCache.getQueryData(userListQuery.key)

      // create new user
      const newUser = {
        ...user,
        id: uuid()
      }

      // create a copy of the current user list with new user
      const newUserList = [...oldUserList || [], newUser]

      // update caches
      queryCache.setQueryData(userListQuery.key, newUserList)
      queryCache.setQueryData(userByIdQuery(newUser.id).key, newUser)

      // cancel queries depending on user list
      queryCache.cancelQueries({ key: userListQuery.key })

      // pass the old and new user list and the new user to the other hooks
      return { oldUserList, newUserList, newUser }
    },

    mutation: (user) => useEmit("user:create", user),

    onSettled(_data, _error, _vars, { newUser }) {
      // invalidate the queries to refetch the new data
      queryCache.invalidateQueries({ key: userListQuery.key })

      // newUser can be undefined if the onMutate hook fails
      if (newUser) {
        queryCache.cancelQueries({ key: userByIdQuery(newUser.id).key })
        queryCache.remove({ key: userByIdQuery(newUser.id).key })
      }
    },

    onError(err, _vars, { oldUserList, newUserList }) {
      // before applying the rollback, check if the value in the cache is the same
      //    in case the cache was updated by another mutation or query
      if (newUserList === queryCache.getQueryData(userListQuery.key)) {
        queryCache.setQueryData(userListQuery.key, oldUserList)
      }

      // handle the error
      console.error("[useCreateUser] [onError]", err)
    },

    onSuccess(user, _vars, { newUser }) {
      console.log("[useCreateUser] [onSuccess]", user)

      // update users list with the newly created user returned by the api
      const userList = queryCache.getQueryData(userListQuery.key) || []

      // replace the user created in onMutate() with the one returned by the server
      const userIndex = _findLastIndex(userList, { id: newUser.id })

      if (userIndex >= 0) {
        const userListCopy = userList.toSpliced(userIndex, 1, user)
        queryCache.setQueryData(userListQuery.key, userListCopy)
      }

      // add user returned by the api to cache
      queryCache.ensure(userByIdQuery(user.id))
      queryCache.setQueryData(userByIdQuery(user.id).key, user)
    }
  })

  return {
    ...mutation,
    createUser: async (attributes) => await mutateAsync(attributes)
  }
})
