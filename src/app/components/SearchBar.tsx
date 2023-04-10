'use client'

import { useRouter } from 'next/navigation'
import { MagnifyingGlass } from 'phosphor-react'
import React, { useState } from 'react'

import '../styles/components/SearchBar.scss'

export function SearchBar() {
  const [search, setSearch] = useState<string>('')
  const router = useRouter()

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (search.length > 2) {
      router.push(`/search/${search.toLowerCase()}`)
    }
  }

  return (
    <form
      className="searchBarContainer"
      onSubmit={(e) => {
        handleSearchSubmit(e)
      }}
    >
      <input type="text" onChange={(e) => setSearch(e.target.value)} />
      {search ? (
        <button type="submit">
          <MagnifyingGlass size={25} weight="bold" />
        </button>
      ) : (
        <button type="submit" disabled>
          <MagnifyingGlass size={25} weight="bold" />
        </button>
      )}
    </form>
  )
}
