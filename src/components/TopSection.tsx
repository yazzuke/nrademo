interface Props {
  name: string
}

export function TopSection({ name }: Props) {
  const parts = name.split(' ')
  const word1 = parts[0]?.toUpperCase() ?? ''
  const word2 = parts[1] ?? ''
  const word3 = parts[2]?.toUpperCase() ?? ''

  return (
    <div className="top-content">
      <div className="regtangle-svg">
        <img src="/assets/toast-seal.png" alt="" className="toast-seal" />
        <img src="/assets/tray-seal.png" alt="" className="tray-seal" />
        <div className="regtangle-title">
          <h2 className="GT-Walsheim-Pro">{word1}</h2>
          <h1 className="head-turn">{word2}</h1>
          <h1 className="GT-Walsheim-Pro">{word3}</h1>
        </div>
        <div
          className="regtangle-image-0"
          style={{ backgroundImage: "url('/assets/img-1.png')" }}
        />
      </div>
    </div>
  )
}
