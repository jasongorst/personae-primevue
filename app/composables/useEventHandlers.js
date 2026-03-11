export default function useEventHandlers() {
  const {
    $socketio: { socket }
  } = useNuxtApp()

  socket.on("character:create", createCharacter)
  socket.on("character:delete", deleteCharacter)
  socket.on("character:update", updateCharacter)

  const queryCache = useQueryCache()

  function createCharacter(character) {
    const characterList = _concat(
      queryCache.getQueryData(characterListQuery.key) || [],
      character
    )

    const options = characterOptions(characterList)

    queryCache.setQueryData(characterListQuery.key, characterList)
    queryCache.setQueryData(characterOptionsQuery.key, options)

    queryCache.ensure(characterByIdQuery(character.id))
    queryCache.setQueryData(characterByIdQuery(character.id).key, character)

    queryCache.cancelQueries({ key: characterListQuery.key })
  }

  function deleteCharacter(id) {
    const characterList = _reject(
      queryCache.getQueryData(characterListQuery.key) || [],
      { id }
    )

    const options = characterOptions(characterList)

    queryCache.setQueryData(characterListQuery.key, characterList)
    queryCache.setQueryData(characterOptionsQuery.key, options)
    queryCache.remove({ key: characterByIdQuery(id).key })

    queryCache.cancelQueries({ key: characterListQuery.key })
    queryCache.cancelQueries({ key: characterByIdQuery(id).key })
  }

  function updateCharacter(character) {
    const oldCharacterList = queryCache.getQueryData(characterListQuery.key)

    const characterIndex = _findLastIndex(oldCharacterList, {
      id: character.id
    })

    const characterList = oldCharacterList.toSpliced(
      characterIndex,
      1,
      character
    )

    const options = characterOptions(characterList)

    queryCache.setQueryData(characterByIdQuery(character.id).key, character)
    queryCache.setQueryData(characterListQuery.key, characterList)
    queryCache.setQueryData(characterOptionsQuery.key, options)

    queryCache.cancelQueries({ key: characterByIdQuery(character.id).key })
    queryCache.cancelQueries({ key: characterListQuery.key })
  }
}
