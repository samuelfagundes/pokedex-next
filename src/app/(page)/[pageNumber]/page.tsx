'use client'

import { NamedAPIResourceList, PokemonClient } from 'pokenode-ts'
import { useCallback, useEffect, useState } from 'react'
import { redirect, usePathname } from 'next/navigation'
import { Inconsolata } from 'next/font/google'

import { formatId } from '@/utils/formatId'
import { PokemonCard } from '@/app/components/PokemonCard'
import { Button } from '@/app/components/Button'

import '../../styles/dashboard.scss'
import Link from 'next/link'
const inconsolata = Inconsolata({ subsets: ['latin'] })

export default function Dashboard() {
  const [pokemons, setPokemons] = useState<NamedAPIResourceList>()
  const pathName: string = usePathname().split('/')[1]
  let limit = 60

  const listLimit = useCallback(() => {
    if (Number(pathName) === 17) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      return (limit = 48)
    } else {
      return limit
    }
  }, [])

  useEffect(() => {
    async function getPokemons() {
      const api = new PokemonClient()

      await api
        .listPokemons((Number(pathName) - 1) * 60, listLimit())
        .then((data) => setPokemons(data))
        .catch((error) => console.log(error))
    }

    if (Number(pathName) <= 17) {
      getPokemons()
    } else {
      redirect('/')
    }
  }, [pathName, listLimit])

  return (
    <main className={inconsolata.className}>
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
          <Link href={`/${Number(pathName) - 1}`}>
            <Button className="previous" text="Previous page" />
          </Link>
        ) : (
          <></>
        )}

        {pokemons?.next && Number(pathName) !== 17 ? (
          <Link href={`/${Number(pathName) + 1}`}>
            <Button className="next" text="Next page" />
          </Link>
        ) : (
          <></>
        )}
      </div>
    </main>
  )
}
