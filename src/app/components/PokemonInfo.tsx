import { Question, X } from 'phosphor-react'
import { Ability, PokemonSpecies } from 'pokenode-ts'
import { useState } from 'react'

interface PokemonInfoProps {
  ability: Ability | undefined
  species: PokemonSpecies | undefined
  pokemonHeight: number | undefined
  pokemonWeight: number | undefined
}

export function PokemonInfo({
  ability,
  species,
  pokemonHeight,
  pokemonWeight,
}: PokemonInfoProps) {
  const [isInfoOpen, setIsInfoOpen] = useState(false)

  function handleAbilityInfo() {
    setIsInfoOpen((prevState) => !prevState)
  }

  function convertHeight() {
    return (Number(pokemonHeight) / 10).toFixed(1)
  }

  function convertWeight() {
    return (Number(pokemonWeight) / 10).toFixed(1)
  }

  function getGenera() {
    const genera = species?.genera.find(
      (genera) => genera.language.name === 'en',
    )

    if (genera) {
      return genera?.genus.split('Pokémon')
    } else {
      return 'Unknown'
    }
  }

  function getAbility() {
    const englishAbility = ability?.effect_entries.find(
      (genera) => genera.language.name === 'en',
    )

    return englishAbility?.effect
  }

  return (
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
          <span>Category: {getGenera()}</span>
          <span style={{ textTransform: 'capitalize' }}>
            Ability: {ability?.name}
            <button onClick={handleAbilityInfo}>
              <Question size={25} />
            </button>
          </span>
        </>
      )}
    </div>
  )
}
