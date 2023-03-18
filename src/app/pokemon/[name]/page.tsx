'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Ability, Pokemon, PokemonClient, PokemonSpecies } from 'pokenode-ts'
import { useEffect, useState } from 'react'
import { Inconsolata } from 'next/font/google'

import '../../styles/pokemonPage.scss'
import { Stats } from '@/app/components/Stats'
import { PokemonInfo } from '@/app/components/PokemonInfo'
import { Types } from '@/app/components/Types'

const inconsolata = Inconsolata({ subsets: ['latin'] })

export default function PokemonPage() {
  const [pokemonInfo, setPokemonInfo] = useState<Pokemon>()
  const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies>()
  const [abilityInfo, setAbilityInfo] = useState<Ability>()

  const splitPath = usePathname().split('/')
  const pokemonName = splitPath[splitPath.length - 1]

  const abilityInfoUrl = pokemonInfo?.abilities[0].ability.url.split('/')
  const abilityId = abilityInfoUrl?.[abilityInfoUrl?.length - 2]

  useEffect(() => {
    async function getPokemons() {
      const api = new PokemonClient()

      await api
        .getPokemonByName(pokemonName)
        .then((data) => setPokemonInfo(data))
        .catch((error) => console.log(error))

      await api
        .getPokemonSpeciesByName(pokemonName)
        .then((data) => setPokemonSpecies(data))
        .catch((err) => console.log(err))

      if (abilityId) {
        await api
          .getAbilityById(Number(abilityId))
          .then((data) => setAbilityInfo(data))
          .catch((error) => console.log(error))
      }
    }

    console.log('Hello')

    getPokemons()
  }, [pokemonName, abilityId])

  function formatId(pokemonId: string | undefined) {
    if (pokemonId?.length === 1) {
      return '#00' + pokemonId
    } else if (pokemonId?.length === 2) {
      return '#0' + pokemonId
    } else {
      return '#' + pokemonId
    }
  }

  return (
    <div className={`${inconsolata.className} pokemonPageContainer`}>
      <h1>
        {pokemonInfo?.name} <span>{formatId(String(pokemonInfo?.id))}</span>
      </h1>
      <div className="pageGrid">
        <div className="imageContainer">
          {pokemonInfo?.sprites.other?.['official-artwork'].front_default && (
            <Image
              src={pokemonInfo.sprites.other['official-artwork'].front_default}
              width={500}
              height={500}
              alt={pokemonInfo!.name}
            />
          )}
        </div>
        <div>
          <div className="flavor_text">
            <span>{pokemonSpecies?.flavor_text_entries[0].flavor_text}</span>
          </div>
          <PokemonInfo
            ability={abilityInfo}
            species={pokemonSpecies}
            pokemonHeight={pokemonInfo?.height}
            pokemonWeight={pokemonInfo?.weight}
          />
          <Types pokemonInfo={pokemonInfo} />
        </div>
      </div>
      <div>
        <Stats pokemonInfo={pokemonInfo} />
      </div>
    </div>
  )
}
