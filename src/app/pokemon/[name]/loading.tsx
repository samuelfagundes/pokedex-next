import '../../styles/pokemonPageLoading.scss'

export default function Loading() {
  return (
    <main className="pokemonPageContainer">
      <h1>
        <div className="namePlaceholder" />
      </h1>
      <div className="pageGrid">
        <div className="imageContainerPlaceholder" />
        <div>
          <div className="flavorTextPlaceholder">
            <div />
            <div />
          </div>
          <div className="infoPlaceholder" />
          <div className="typesPlaceholder" />
        </div>
      </div>
      <div>
        <div className="statsPlacehoder" />
      </div>
    </main>
  )
}
