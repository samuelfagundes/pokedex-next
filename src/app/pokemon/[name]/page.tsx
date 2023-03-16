'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Ability, Pokemon, PokemonClient, PokemonSpecies } from 'pokenode-ts'
import { useEffect, useState } from 'react'
import { Inconsolata } from 'next/font/google'

import '../../styles/pokemonPage.scss'
import { pokemonTypesColors } from '@/utils/pokemonTypesColors'
import { readableColor } from 'polished'
import { Question, X } from 'phosphor-react'

const inconsolata = Inconsolata({ subsets: ['latin'] })

export default function PokemonPage() {
  const [pokemonInfo, setPokemonInfo] = useState<Pokemon>()
  const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies>()
  const [abilityInfo, setAbilityInfo] = useState<Ability>()
  const [isInfoOpen, setIsInfoOpen] = useState(false)

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

    getPokemons()
  }, [pokemonName, abilityId])

  function handleAbilityInfo() {
    setIsInfoOpen((prevState) => !prevState)
  }

  function formatId(pokemonId: string | undefined) {
    if (pokemonId?.length === 1) {
      return '#00' + pokemonId
    } else if (pokemonId?.length === 2) {
      return '#0' + pokemonId
    } else {
      return '#' + pokemonId
    }
  }

  function convertHeight() {
    return (Number(pokemonInfo?.height) / 10).toFixed(1)
  }

  function convertWeight() {
    return (Number(pokemonInfo?.weight) / 10).toFixed(1)
  }

  function getGenera() {
    const genera = pokemonSpecies?.genera.find(
      (genera) => genera.language.name === 'en',
    )

    return genera?.genus.split('Pokémon')
  }

  function getAbility() {
    const ability = abilityInfo?.effect_entries.find(
      (genera) => genera.language.name === 'en',
    )

    return ability?.effect
  }

  function getTypeColor(color: string) {
    return pokemonTypesColors[color]
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
          <div className={`${isInfoOpen ? 'infoModal' : ''}  pokemonInfo`}>
            {isInfoOpen ? (
              <>
                <div>
                  <h4>Ability Info</h4>
                  <X size={20} onClick={handleAbilityInfo} />
                </div>
                <span>{getAbility()}</span>
              </>
            ) : (
              <>
                <span>Height: {convertHeight()}m</span>
                <span>Weight: {convertWeight()}Kg</span>
                <span>Type: {getGenera()}</span>
                <span>
                  Ability: {pokemonInfo?.abilities[0].ability.name}
                  <button onClick={handleAbilityInfo}>
                    <Question size={25} />
                  </button>
                </span>
              </>
            )}
          </div>
          <div className="typeContainer">
            <h2>Type</h2>
            <div>
              {pokemonInfo?.types.map((type) => {
                return (
                  <div
                    key={type.type.name}
                    className="typeTag"
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
        </div>
      </div>
    </div>
  )
}
