// noinspection JSIgnoredPromiseFromCall

export const useUpdateCharacter = defineMutation(() => {
  const queryCache = useQueryCache()

  const { mutate, ...mutation } = useMutation({
    onMutate({ id, updates }) {
      // save the character list
      const oldCharacterList = queryCache.getQueryData(characterListQuery.key)

      // find the index of the mutated character
      const characterIndex = _findIndex(oldCharacterList, { id })

      let oldOptions, newCharacter, newCharacterList

      if (characterIndex >= 0) {
        // save the options and character
        oldOptions = queryCache.getQueryData(characterOptionsQuery.key)
        const oldCharacter = oldCharacterList[characterIndex]

        // create the new character
        newCharacter = { ...oldCharacter, ...updates }

        // create a copy of the character list with the updated character
        newCharacterList = oldCharacterList.toSpliced(characterIndex, 1, newCharacter)

        // calculate new character options
        const newOptions = characterOptions(newCharacterList)

        // update caches
        queryCache.setQueryData(characterListQuery.key, newCharacterList)
        queryCache.setQueryData(characterOptionsQuery.key, newOptions)

        // cancel (without refreshing) queries depending on the character
        queryCache.cancelQueries({ key: characterListQuery.key })
      }

      // pass the old and new character and character lists to the other hooks
      return {
        newCharacter,
        oldCharacterList,
        newCharacterList,
        oldOptions
      }
    },

    mutation: ({ id, updates }) => useEmit("character:update", id, updates),

    onSettled(_data, _error, _vars, { newCharacter }) {
      // invalidate the queries to refetch the new data
      if (newCharacter) {
        queryCache.invalidateQueries({ key: characterListQuery.key })
      }
    },

    onError(err, _vars, { oldCharacterList, oldOptions, newCharacterList }) {
      // before applying the rollback, check if the values in the cache are the same
      //    in case the cache was updated by another mutation or query
      if (
        newCharacterList === queryCache.getQueryData(characterListQuery.key)
      ) {
        queryCache.setQueryData(characterListQuery.key, oldCharacterList)
        queryCache.setQueryData(characterOptionsQuery.key, oldOptions)
      }

      // handle the error
      console.error("[useDeleteCharacter] [onError]", err)
    },

    onSuccess() {}
  })

  return {
    ...mutation,
    updateCharacter: (id, updates) => mutate({ id, updates })
  }
})
