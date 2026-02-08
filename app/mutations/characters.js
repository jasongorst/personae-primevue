export const useCreateCharacter = defineMutation(() => {
  const queryCache = useQueryCache()

  const { mutate, ...mutation } = useMutation({
    mutation: (character) => {
      console.log("[useCreateCharacter] [mutation]")

      return useEmit("character:create", character)
    },

    onMutate(character) {
      // save the current character list
      const oldCharacters = queryCache.getQueryData(characterQuery.key)

      // create the new character
      const newCharacter = {
        ...character,
        id: Number.MAX_SAFE_INTEGER
      }

      // create a copy of the current character list with the new character
      const newCharacters = {
        ...oldCharacters,
        [Number.MAX_SAFE_INTEGER]: newCharacter
      }

      // update the cache with the new character list
      queryCache.setQueryData(characterQuery.key, newCharacters)

      // cancel (without refreshing) queries depending on the character list
      queryCache.cancelQueries({ key: characterQuery.key })

      console.log("[useCreateCharacter] [onMutate]", newCharacter)

      // pass both the old and new character list to the other hooks
      return { newCharacters, oldCharacters, newCharacter }
    },

    // on both error and success
    onSettled() {
      console.log("[useCreateCharacter] [onSettled]")

      // invalidate the query to refetch the new data
      // noinspection JSIgnoredPromiseFromCall
      queryCache.invalidateQueries({ key: characterQuery.key, exact: true })
    },

    onError(err, _title, { oldCharacters, newCharacters }) {
      // before applying the rollback, check if the value in the cache is the same
      //    in case the cache was updated by another mutation or query
      if (newCharacters === queryCache.getQueryData(characterQuery.key)) {
        console.log("[useCreateCharacter] [onError] [rollback]")

        queryCache.setQueryData(characterQuery.key, oldCharacters)
      }

      console.error("[useCreateCharacter] [onError]", err)
    },

    onSuccess(character, _vars, { newCharacter }) {
      console.log("[useCreateCharacter] [onSuccess]", character)

      // update from api
      const characters = queryCache.getQueryData(characterQuery.key) || {}

      // replace the character created in onMutate() with the one from the server
      if (_has(characters, newCharacter.id)) {
        const copy = _cloneDeep(characters)
        _unset(copy, newCharacter.id)
        _set(copy, character.id, character)

        queryCache.setQueryData(characterQuery.key, copy)
      }
    }
  })

  return {
    ...mutation,
    createCharacter: (character) => mutate(character)
  }
})

export const useUpdateCharacter = defineMutation(() => {
  const { mutate, ...mutation } = useMutation({
    mutation: (id, attributes) => useEmit("character:update", id, attributes)
  })

  return {
    ...mutation,
    updateCharacter: (id, attributes) => mutate(id, attributes)
  }
})

export const useDeleteCharacter = defineMutation(() => {
  const { mutate, ...mutation } = useMutation({
    mutation: (id) => useEmit("character:delete", id)
  })

  return {
    ...mutation,
    deleteCharacter: (id) => mutate(id)
  }
})
