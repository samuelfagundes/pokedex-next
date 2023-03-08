import { Inter } from 'next/font/google'

import '../styles/components/NavBar.scss'

const inter = Inter({ subsets: ['latin'] })

export function NavBar() {
  return (
    <div className={`${inter.className} header`}>
      <h1>POKEDEX</h1>
    </div>
  )
}
