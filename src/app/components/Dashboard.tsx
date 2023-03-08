'use client'

import { formatId } from '@/utils/formatId'
import { NamedAPIResourceList, PokemonClient } from 'pokenode-ts'
import { useEffect, useState } from 'react'
import { PokemonCard } from './PokemonCard'

import '../styles/dashboard.scss'
import axios from 'axios'
import { Button } from './Button'

export function Dashboard() {
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

  async function handleNextPage() {
    window.scrollTo(0, 0)
    const nextPage = pokemons?.next

    if (nextPage) {
      axios
        .get(nextPage)
        .then((response) => setPokemons(response.data))
        .catch((error) => console.log(error))
    }
  }

  async function handlePreviousPage() {
    window.scrollTo(0, 0)
    const prevPage = pokemons?.previous

    if (prevPage) {
      axios
        .get(prevPage)
        .then((response) => setPokemons(response.data))
        .catch((error) => console.log(error))
    }
  }

  return (
    <main>
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
        {pokemons?.previous ? (
          <Button
            onClick={handlePreviousPage}
            className="previous"
            text="Previous page"
          />
        ) : (
          <></>
        )}
        {pokemons?.next ? (
          <Button onClick={handleNextPage} className="next" text="Next page" />
        ) : (
          <></>
        )}
      </div>
    </main>
  )
}
