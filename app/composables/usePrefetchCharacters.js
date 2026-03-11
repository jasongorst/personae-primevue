export default async function usePrefetchCharacters() {
  const queryCache = useQueryCache()

  await Promise.all([
    queryCache.refresh(queryCache.ensure(characterListQuery)),
    queryCache.refresh(queryCache.ensure(characterOptionsQuery))
  ])
}
