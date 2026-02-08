export default async function usePrefetchCharacters() {
  const queryCache = useQueryCache()
  await queryCache.refresh(queryCache.ensure(characterQuery))
  useCharactersStore().load()
}
