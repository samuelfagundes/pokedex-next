'use client'

import { NamedAPIResourceList, PokemonClient } from 'pokenode-ts'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Inconsolata } from 'next/font/google'

import { formatId } from '@/utils/formatId'

import { PokemonCard } from './components/PokemonCard'
import { Button } from './components/Button'
import './styles/dashboard.scss'
import { CardPlaceholder } from './components/CardPlaceholder'

const inconsolata = Inconsolata({ subsets: ['latin'] })

export default function Home() {
  const [pokemons, setPokemons] = useState<NamedAPIResourceList>()

  useEffect(() => {
    async function getPokemons() {
      const api = new PokemonClient()

      await api
        .listPokemons(0, 60)
        .then((data) => setPokemons(data))
        .catch((error) => console.log(error))
    }

    getPokemons()
  }, [])

  return (
    <main className={inconsolata.className}>
      {pokemons ? (
        <>
          <div className="dashboardContainer">
            {pokemons?.results.map((pokemon) => {
              return (
                <PokemonCard
                  key={pokemon.name}
                  name={pokemon.name}
                  id={formatId(pokemon.url)}
                />
              )
            })}
          </div>
          <div className="buttonsContainer">
            {pokemons?.next ? (
              <Link href={'/page/2'}>
                <Button className="next pageSelector" text="Next page" />
              </Link>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <div className="dashboardContainer">
          <CardPlaceholder />
          <CardPlaceholder />
          <CardPlaceholder />
          <CardPlaceholder />
          <CardPlaceholder />
          <CardPlaceholder />
          <CardPlaceholder />
          <CardPlaceholder />
          <CardPlaceholder />
          <CardPlaceholder />
          <CardPlaceholder />
          <CardPlaceholder />
          <CardPlaceholder />
          <CardPlaceholder />
          <CardPlaceholder />
          <CardPlaceholder />
        </div>
      )}
    </main>
  )
}
