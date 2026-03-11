// noinspection JSIgnoredPromiseFromCall

export const useCreateCharacter = defineMutation(() => {
  const queryCache = useQueryCache()

  const { mutate, ...mutation } = useMutation({
    onMutate(character) {
      // save the current character list and options
      const oldCharacterList = queryCache.getQueryData(characterListQuery.key)
      const oldOptions = queryCache.getQueryData(characterOptionsQuery.key)

      // create the new character
      const newCharacter = {
        ...character,
        id: Number.MAX_SAFE_INTEGER
      }

      console.log("[useCreateCharacter] [onMutate]", newCharacter)

      // create a copy of the current character list with the new character
      const newCharacterList = [...oldCharacterList || [], newCharacter]

      // calculate new character options
      const newOptions = characterOptions(newCharacterList)

      // update the caches with the new character list, options, and character
      queryCache.setQueryData(characterListQuery.key, newCharacterList)
      queryCache.setQueryData(characterOptionsQuery.key, newOptions)

      // cancel (without refreshing) queries depending on the character list
      queryCache.cancelQueries({ key: characterListQuery.key })

      // pass the old and new character list, options,  and the new character to the other hooks
      return { oldCharacterList, newCharacterList, oldOptions, newCharacter }
    },

    mutation: (character) => {
      console.log("[useCreateCharacter] [mutation]", character)

      return useEmit("character:create", character)
    },

    // on both error and success
    onSettled() {
      console.log("[useCreateCharacter] [onSettled]")

      // invalidate queries to refetch the new data
      queryCache.invalidateQueries({ key: characterListQuery.key })

      // newCharacter can be undefined if the onMutate hook fails
      // if (newCharacter) {
      //   queryCache.cancelQueries({ key: characterByIdQuery(newCharacter.id).key })
      //   queryCache.remove({ key: characterByIdQuery(newCharacter.id).key })
      // }
    },

    onError(err, _vars, { oldCharacterList, newCharacterList, oldOptions }) {
      // before applying the rollback, check if the value in the cache is the same
      //    in case the cache was updated by another mutation or query
      if (newCharacterList === queryCache.getQueryData(characterListQuery.key)) {
        console.log("[useCreateCharacter] [onError] [rollback]")

        queryCache.setQueryData(characterListQuery.key, oldCharacterList)
        queryCache.setQueryData(characterOptionsQuery.key, oldOptions)
      }

      // handle the error
      console.error("[useCreateCharacter] [onError]", err)
    },

    onSuccess(character, _vars, { newCharacter }) {
      console.log("[useCreateCharacter] [onSuccess]", character)

      // update character list with the newly created character returned by the api
      const characterList = queryCache.getQueryData(characterListQuery.key) || []

      // replace the character created in onMutate() with the one from the server
      const characterIndex = _findIndex(characterList, { id: newCharacter.id })

      if (characterIndex >= 0) {
        const characterListCopy = characterList.toSpliced(characterIndex, 1, character)
        queryCache.setQueryData(characterListQuery.key, characterListCopy)
      }

      // add character returned by the api to cache
      // queryCache.ensure(characterByIdQuery(character.id))
      // queryCache.setQueryData(characterByIdQuery(character.id).key, character)
    }
  })

  return {
    ...mutation,
    createCharacter: (character) => mutate(character)
  }
})
