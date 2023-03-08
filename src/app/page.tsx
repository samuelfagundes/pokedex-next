import { Inconsolata } from 'next/font/google'
import { Dashboard } from './components/Dashboard'

const inconsolata = Inconsolata({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={inconsolata.className}>
      <Dashboard />
    </main>
  )
}
