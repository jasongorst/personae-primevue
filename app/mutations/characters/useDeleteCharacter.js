// noinspection JSIgnoredPromiseFromCall

export const useDeleteCharacter = defineMutation(() => {
  const queryCache = useQueryCache()

  const { mutate, ...mutation } = useMutation({
    onMutate(id) {
      // save the current character, character list, and options
      const oldCharacterList = queryCache.getQueryData(characterListQuery.key)
      const oldOptions = queryCache.getQueryData(characterOptionsQuery.key)
      // const oldCharacter = queryCache.getQueryData(characterByIdQuery(id).key)

      // create a copy of the current character list without the deleted character
      const newCharacterList = _reject(oldCharacterList || [], { id })

      // calculate new character options
      const newOptions = characterOptions(newCharacterList)

      // update caches
      queryCache.setQueryData(characterListQuery.key, newCharacterList)
      queryCache.setQueryData(characterOptionsQuery.key, newOptions)
      // queryCache.remove({ key: characterByIdQuery(id).key })

      // cancel (without refreshing) queries depending on the character
      queryCache.cancelQueries({ key: characterListQuery.key })
      // queryCache.cancelQueries({ key: characterByIdQuery(id).key })

      // pass the old character and the old and new character lists to the other hooks
      return { oldCharacterList, newCharacterList, oldOptions }
    },

    mutation: (id) => useEmit("character:delete", id),

    onSettled() {
      // invalidate the queries to refetch the new data
      queryCache.invalidateQueries({ key: characterListQuery.key })
      // queryCache.invalidateQueries({ key: characterByIdQuery(id).key })
    },

    onError(err, _vars, { oldCharacterList, oldOptions, newCharacterList }) {
      // before applying the rollback, check if the values in the cache are the same
      //    in case the cache was updated by another mutation or query
      if (newCharacterList === queryCache.getQueryData(characterListQuery.key)) {
        queryCache.setQueryData(characterListQuery.key, oldCharacterList)
        queryCache.setQueryData(characterOptionsQuery.key, oldOptions)
      }

      // if (queryCache.getQueryData(characterByIdQuery(id).key) === undefined) {
      //   queryCache.ensure(characterByIdQuery(id))
      //   queryCache.setQueryData(characterByIdQuery(id).key, oldCharacter)
      // }

      // handle the error
      console.error("[useDeleteCharacter] [onError]", err)
    },

    onSuccess() {}
  })

  return {
    ...mutation,
    deleteCharacter: (id) => mutate(id)
  }
})
