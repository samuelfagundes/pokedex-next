'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  Ability,
  EvolutionChain,
  EvolutionClient,
  Pokemon,
  PokemonClient,
  PokemonSpecies,
} from 'pokenode-ts'
import { useEffect, useState } from 'react'
import { Inconsolata } from 'next/font/google'

import { Stats } from '@/app/components/Stats'
import { PokemonInfo } from '@/app/components/PokemonInfo'
import { EvoChain } from '@/app/components/EvolutionChain'
import { Types } from '@/app/components/Types'
import Loading from './loading'
import '../../styles/pokemonPage.scss'
import { CaretDown } from 'phosphor-react'
import Link from 'next/link'

const inconsolata = Inconsolata({ subsets: ['latin'] })

export default function PokemonPage() {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false)
  const [pokemonInfo, setPokemonInfo] = useState<Pokemon>()
  const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies>()
  const [abilityInfo, setAbilityInfo] = useState<Ability>()
  const [evoChain, setEvoChain] = useState<EvolutionChain>()

  const splitPath = usePathname().split('/')
  const pokemonFullName = splitPath[splitPath.length - 1]
  const pokemonSplitName = pokemonFullName.split('-')
  const pokemonName = pokemonSplitName[0]

  const abilityInfoUrl = pokemonInfo?.abilities[0].ability.url.split('/')
  const abilityId = abilityInfoUrl?.[abilityInfoUrl.length - 2]

  const splitChainUrl = pokemonSpecies?.evolution_chain?.url.split('/')
  const evoChainId = splitChainUrl?.[splitChainUrl.length - 2]

  useEffect(() => {
    async function getPokemons() {
      const api = new PokemonClient()

      await api
        .getPokemonByName(pokemonFullName)
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

    getPokemons()
  }, [abilityId, pokemonFullName, pokemonName])

  useEffect(() => {
    async function getEvolutions() {
      const api = new EvolutionClient()

      if (evoChainId) {
        await api
          .getEvolutionChainById(Number(evoChainId))
          .then((data) => setEvoChain(data))
          .catch((error) => console.log(error))
      }
    }

    getEvolutions()
  }, [evoChainId])

  function handleOpenSelector() {
    setIsSelectorOpen((prevState) => !prevState)
  }

  function englishFlavorText() {
    const flavorText = pokemonSpecies?.flavor_text_entries.find(
      (text) => text.language.name === 'en',
    )

    return flavorText?.flavor_text
  }

  function formatId(pokemonId: string | undefined) {
    if (pokemonId?.length === 1) {
      return '#000' + pokemonId
    } else if (pokemonId?.length === 2) {
      return '#00' + pokemonId
    } else if (pokemonId?.length === 3) {
      return '#0' + pokemonId
    } else {
      return '#' + pokemonId
    }
  }

  return (
    <>
      {pokemonInfo ? (
        <div className={`${inconsolata.className} pokemonPageContainer`}>
          {pokemonSpecies?.varieties.length !== undefined &&
          pokemonSpecies?.varieties.length > 1 ? (
            <>
              <div className="selectorContainer">
                <button
                  className={`${inconsolata.className} selector`}
                  onClick={handleOpenSelector}
                >
                  <div>
                    <CaretDown size={25} />
                  </div>
                  <h1>{pokemonInfo.name}</h1>
                  <span>{formatId(String(pokemonInfo?.id))}</span>
                </button>
                {isSelectorOpen === true && (
                  <div className="openSelector">
                    {pokemonSpecies.varieties.map((variety) => {
                      return (
                        <Link
                          href={`/pokemon/${variety.pokemon.name}`}
                          key={variety.pokemon.name}
                        >
                          <button
                            className={`${inconsolata.className} selectorItem`}
                          >
                            <h2>{variety.pokemon.name}</h2>
                          </button>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <h1>
                {pokemonInfo.name}
                <span>{formatId(String(pokemonInfo?.id))}</span>
              </h1>
            </>
          )}
          <div className="pageGrid">
            <div className="imageContainer">
              {pokemonInfo?.sprites.other?.['official-artwork']
                .front_default && (
                <Image
                  src={
                    pokemonInfo.sprites.other['official-artwork'].front_default
                  }
                  width={500}
                  height={500}
                  alt={pokemonInfo.name}
                />
              )}
            </div>
            <div>
              <div className="flavor_text">
                <span>{englishFlavorText()}</span>
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
          {evoChain && (
            <div>
              <EvoChain evoChain={evoChain} />
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}
