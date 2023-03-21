import Image from 'next/image'
import Link from 'next/link'
import { CaretRight } from 'phosphor-react'
import { EvolutionChain } from 'pokenode-ts'

import '../styles/components/EvolutionChain.scss'

interface EvolutionProps {
  evoChain: EvolutionChain | undefined
}

export function EvoChain({ evoChain }: EvolutionProps) {
  const firstEvolutionUrl = evoChain?.chain.species.url
  const firstEvolutionSplit = firstEvolutionUrl?.split('/')
  const firstEvolutionId = firstEvolutionSplit?.[firstEvolutionSplit.length - 2]

  const thirdEvolutionUrl =
    evoChain?.chain.evolves_to[0].evolves_to[0]?.species.url
  const thirdEvolutionSplit = thirdEvolutionUrl?.split('/')
  const thirdEvolutionId = thirdEvolutionSplit?.[thirdEvolutionSplit.length - 2]
  const firstSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${firstEvolutionId}.png`
  const thirdSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${thirdEvolutionId}.png`

  return (
    <div className="evolutionChainContainer">
      <h2>Evolution chain</h2>

      <div className="evolutionChain">
        {evoChain?.chain.species.name && (
          <Link href={`/pokemon/${evoChain.chain.species.name}`}>
            <div className="pokemon">
              <Image
                src={firstSprite}
                width={200}
                height={200}
                alt={evoChain.chain.species.name}
              />
              <span>{evoChain.chain.species.name}</span>
            </div>
          </Link>
        )}
        {evoChain?.chain.evolves_to[0].species.name && (
          <CaretRight size={50} color="white" />
        )}
        {evoChain?.chain.evolves_to[0].species.name && (
          <div
            className={`${
              evoChain.chain.evolves_to.length > 1 ? 'multipleEvolutions' : ''
            } pokemonContainer`}
          >
            {evoChain.chain.evolves_to.map((pokemon) => {
              const secondEvolutionUrl = pokemon.species.url
              const secondEvolutionSplit = secondEvolutionUrl?.split('/')
              const secondEvolutionId =
                secondEvolutionSplit?.[secondEvolutionSplit.length - 2]
              const secondSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${secondEvolutionId}.png`

              return (
                <Link
                  href={`/pokemon/${pokemon.species.name}`}
                  key={pokemon.species.name}
                >
                  <div className="pokemon">
                    <Image
                      src={secondSprite}
                      width={200}
                      height={200}
                      alt={pokemon.species.name}
                    />
                    <span>{pokemon.species.name}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
        {evoChain?.chain.evolves_to[0].evolves_to[0]?.species.name && (
          <div className="pokemonContainer">
            <CaretRight size={50} color="white" />
            <Link
              href={`/pokemon/${evoChain.chain.evolves_to[0].evolves_to[0].species.name}`}
            >
              <div className="pokemon">
                <Image
                  src={thirdSprite}
                  width={200}
                  height={200}
                  alt={evoChain.chain.evolves_to[0].evolves_to[0].species.name}
                />
                <span>
                  {evoChain.chain.evolves_to[0].evolves_to[0].species.name}
                </span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
