import { Pokemon } from 'pokenode-ts'

import '../styles/components/Stats.scss'

interface StatsProps {
  pokemonInfo: Pokemon | undefined
}

export function Stats({ pokemonInfo }: StatsProps) {
  function lifeSize() {
    if (pokemonInfo !== undefined) {
      return (pokemonInfo.stats[0].base_stat * 100) / 255
    }
  }

  function attackSize() {
    if (pokemonInfo !== undefined) {
      return (pokemonInfo.stats[1].base_stat * 100) / 181
    }
  }

  function defenseSize() {
    if (pokemonInfo !== undefined) {
      return (pokemonInfo.stats[2].base_stat * 100) / 230
    }
  }

  function spAttackSize() {
    if (pokemonInfo !== undefined) {
      return (pokemonInfo.stats[3].base_stat * 100) / 180
    }
  }

  function spDefenseSize() {
    if (pokemonInfo !== undefined) {
      return (pokemonInfo.stats[4].base_stat * 100) / 230
    }
  }

  function speedSize() {
    if (pokemonInfo !== undefined) {
      return (pokemonInfo.stats[5].base_stat * 100) / 200
    }
  }

  return (
    <div className="statsContainer">
      <h2>Stats</h2>
      <div className="stats">
        <span>Hp</span>
        <div className="emptyBar">
          <div className="fullBar" style={{ width: `${lifeSize()}%` }}></div>
        </div>
        <span>Attack</span>
        <div className="emptyBar">
          <div className="fullBar" style={{ width: `${attackSize()}%` }}></div>
        </div>
        <span>Defense</span>
        <div className="emptyBar">
          <div className="fullBar" style={{ width: `${defenseSize()}%` }}></div>
        </div>
        <span>Sp. Attack</span>
        <div className="emptyBar">
          <div
            className="fullBar"
            style={{ width: `${spAttackSize()}%` }}
          ></div>
        </div>
        <span>Sp. Defense</span>
        <div className="emptyBar">
          <div
            className="fullBar"
            style={{ width: `${spDefenseSize()}%` }}
          ></div>
        </div>
        <span>Speed</span>
        <div className="emptyBar">
          <div className="fullBar" style={{ width: `${speedSize()}%` }}></div>
        </div>
      </div>
    </div>
  )
}
