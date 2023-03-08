'use client'

// import { pokemonTypesColors } from '@/utils/pokemonTypesColors'
import Image from 'next/image'
import { Pokemon, PokemonClient, PokemonSpecies } from 'pokenode-ts'
import { useEffect, useState } from 'react'
import { readableColor } from 'polished'

import '../styles/components/PokemonCard.scss'
import { pokemonTypesColors } from '@/utils/pokemonTypesColors'
import Link from 'next/link'

interface PokemonProps {
  name: string | undefined
  id: string | undefined
}

export function PokemonCard({ name, id }: PokemonProps) {
  const [pokemon, setPokemon] = useState<Pokemon>()
  const [species, setSpecies] = useState<PokemonSpecies>()
  const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

  useEffect(() => {
    async function getSpecies() {
      const api = new PokemonClient()

      if (name) {
        await api
          .getPokemonSpeciesByName(name)
          .then((data) => setSpecies(data))
          .catch((error) => console.log(error))

        await api
          .getPokemonByName(name)
          .then((data) => setPokemon(data))
          .catch((error) => console.log(error))
      }
    }

    getSpecies()
  }, [name])

  function formatId(pokemonId: string | undefined) {
    if (pokemonId?.length === 1) {
      return '#00' + pokemonId
    } else if (pokemonId?.length === 2) {
      return '#0' + pokemonId
    } else {
      return '#' + pokemonId
    }
  }

  function getTypeColor(color: string) {
    return pokemonTypesColors[color]
  }

  return (
    <Link href={`/pokemon/${name}`}>
      <div className="card" style={{ borderColor: `${species?.color.name}` }}>
        <h2>{formatId(id)}</h2>
        <Image src={sprite} width={180} height={180} alt="" />
        <h1>{name}</h1>
        <div className="types">
          {pokemon?.types.map((type) => {
            return (
              <div
                key={type.type.name}
                style={{
                  backgroundColor: `${getTypeColor(type.type.name)}`,
                }}
              >
                <span
                  style={{
                    color: readableColor(
                      `${pokemonTypesColors[type.type.name]}`,
                    ),
                  }}
                >
                  {type.type.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </Link>
  )
}
