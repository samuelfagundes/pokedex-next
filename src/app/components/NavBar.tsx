import { Inter } from 'next/font/google'
import Link from 'next/link'

import '../styles/components/NavBar.scss'
import { SearchBar } from './SearchBar'

const inter = Inter({ subsets: ['latin'] })

export function NavBar() {
  return (
    <div className={`${inter.className} header`}>
      <Link href={'/'}>
        <h1>POKEDEX</h1>
      </Link>
      <SearchBar />
    </div>
  )
}
