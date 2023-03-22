'use client'

import { PokemonCard } from '@/app/components/PokemonCard'
import { formatId } from '@/utils/formatId'
import { usePathname } from 'next/navigation'
import { NamedAPIResourceList, PokemonClient } from 'pokenode-ts'
import { useEffect, useState } from 'react'
import { Inconsolata } from 'next/font/google'
import '../../styles/dashboard.scss'

const inconsolata = Inconsolata({ subsets: ['latin'] })

export default function Search() {
  const [allPokemons, setAllPokemons] = useState<NamedAPIResourceList>()
  const resultUrl = usePathname().split('/')
  const result = resultUrl[resultUrl.length - 1]

  useEffect(() => {
    async function getPokemon() {
      const api = new PokemonClient()

      await api
        .listPokemons(0, 1008)
        .then((data) => setAllPokemons(data))
        .catch((error) => console.log(error))
    }

    console.log('...')

    getPokemon()
  }, [])
  console.log(allPokemons)

  return (
    <main>
      <div className={`${inconsolata.className} dashboardContainer`}>
        {allPokemons?.results.map((pokemon) => {
          if (pokemon.name.includes(result)) {
            return (
              <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                id={formatId(pokemon.url)}
              />
            )
          }
          return <></>
        })}
      </div>
    </main>
  )
}
