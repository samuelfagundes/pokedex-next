'use client'

import { usePathname } from 'next/navigation'
import { Pokemon, PokemonClient } from 'pokenode-ts'
import { useEffect, useState } from 'react'

import '../../styles/pokemonPage.scss'

export default function PokemonPage() {
  const [pokemonInfo, setPokemonInfo] = useState<Pokemon>()

  const splitPath = usePathname().split('/')
  const pokemonName = splitPath[splitPath.length - 1]

  useEffect(() => {
    async function getPokemons() {
      const api = new PokemonClient()

      await api
        .getPokemonByName(pokemonName)
        .then((data) => setPokemonInfo(data))
        .catch((error) => console.log(error))
    }

    getPokemons()
  }, [pokemonName])

  return (
    <div className="pokemonPageContainer">
      <h1>{pokemonInfo?.name}</h1>
    </div>
  )
}
