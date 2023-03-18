import { pokemonTypesColors } from '@/utils/pokemonTypesColors'
import { Pokemon } from 'pokenode-ts'
import { readableColor } from 'polished'

interface TypesProps {
  pokemonInfo: Pokemon | undefined
}

export function Types({ pokemonInfo }: TypesProps) {
  function getTypeColor(color: string) {
    return pokemonTypesColors[color]
  }

  return (
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
                  color: readableColor(`${pokemonTypesColors[type.type.name]}`),
                }}
              >
                {type.type.name}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
