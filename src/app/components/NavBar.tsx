'use client'

import { Inter } from 'next/font/google'
import Link from 'next/link'
import { CaretLeft } from 'phosphor-react'

import '../styles/components/NavBar.scss'
import { SearchBar } from './SearchBar'

const inter = Inter({ subsets: ['latin'] })

export function NavBar() {
  return (
    <div className="headerContainer">
      <div className={`${inter.className} header`}>
        <button onClick={() => history.back()} className="backButton">
          <CaretLeft size={40} color="var(--white)" />
        </button>
        <Link href={'/'}>
          <h1>POKEDEX</h1>
        </Link>
        <SearchBar />
      </div>
    </div>
  )
}
