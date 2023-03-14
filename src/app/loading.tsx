import { CardPlaceholder } from './components/CardPlaceholder'

import './styles/dashboard.scss'

export default function Loading() {
  return (
    <main>
      <div className="dashboardContainer">
        <CardPlaceholder />
        <CardPlaceholder />
        <CardPlaceholder />
        <CardPlaceholder />
        <CardPlaceholder />
        <CardPlaceholder />
        <CardPlaceholder />
        <CardPlaceholder />
      </div>
    </main>
  )
}
