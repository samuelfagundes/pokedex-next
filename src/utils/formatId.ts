export function formatId(url: string | undefined) {
  if (url) {
    const splitUrlId = url.split('/')
    const pokemonId = splitUrlId[splitUrlId.length - 2]

    return pokemonId
  }
}
